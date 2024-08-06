import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

dotenv.config();

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

//creates connection to database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if(err){
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + db.threadId);
})

//checks user auth token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err,user) =>{
        if(err){
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

//server backend
app.get('/', (req,res) => {
    res.send('Hello from the backend!');
})

//registers a user
app.post('/register', (req,res) => {
    const{ name, password } = req.body;

    if(!name || !password){
        return res.send('Please provide a name and password');
    }

    const checkUserQuery = 'SELECT * FROM USER WHERE name = ?';
    db.query(checkUserQuery, [name], (err,results) => {
        if(err){
            console.error(err);
            return res.send('Server error');
         }

        if(results.length > 0){
            return res.send('Username already exists');
        }

        bcrypt.hash(password, 10, (err,hashedPassword) => {
            if(err){
                console.error(err);
                return res.send('Error hashing password');
            }

            const insertUserQuery = 'INSERT INTO User (name, password) VALUES (?, ?)';
            db.query(insertUserQuery, [name,hashedPassword], (err, results) => {
                if(err){
                    console.error(err);
                    return res.send('Server error');
                }

                res.send('User registered');
            });
        });
    });    
});

//logs a user in 
app.post('/login', (req, res) => {
    const{ name, password } = req.body;

    if(!name || !password){
        return res.send('Please provide a name and password');
    }

    const query = 'Select * FROM User WHERE name = ?';
    db.query(query, [name], (err,results) => {
        if(err){
            console.error(err);
            return res.send('Server error');
        }

        if(results.length === 0){
            return res.send('User not found');
        }

        const user = results[0];

        const isPasswordHashed = user.password.startsWith('$2b$');
        
        if(isPasswordHashed){
            bcrypt.compare(password, user.password, (err, isPasswordValid) => {
                if(err){
                    console.error(err);
                    return res.send('Server error');
                }
    
                if(!isPasswordValid){
                    return res.send('Invalid password');
                }
    
                const token = jwt.sign({id:user.user_ID, name: user.name}, process.env.JWT_SECRET, {
                    expiresIn:'1h'
                });
        
                res.json({token});
            });
        }else{
            if(password !== user.password){
                return res.send('Invalid password');
            }

            const token = jwt.sign({id:user.user_ID, name: user.name}, process.env.JWT_SECRET, {
                expiresIn:'1h'
            });

            res.json({token});
        }
    });
});

//gets all available car yeas
app.get('/years', (req,res) => {
    const query = 'SELECT DISTINCT year from Car ORDER BY year DESC';
    db.query(query, (err, results) => {
        if(err){
            console.error(err);
            return res.send('Server error');
        }
        res.json(results.map(row => row.year));
    });
});

//gets all available car makes
app.get('/makes', (req,res) => {
    const query = 'SELECT DISTINCT make from Car ORDER BY make ASC';
    db.query(query, (err, results) => {
        if(err){
            console.error(err);
            return res.send('Server error');
        }
        res.json(results.map(row => row.make));
    });
});

//gets all available models based on make and year
app.get('/models/:make/:year', (req, res) => {
    const { make, year } = req.params;
    const query = 'SELECT DISTINCT model FROM Car where make = ? AND year = ? ORDER BY model';
    db.query(query, [make, year], (err, results) => {
        if(err){
            console.error(err);
            return res.send('Server error');
        }
        res.json(results.map(row => row.model));
    });
});

//creates a review 
app.post('/review', authenticateToken, (req, res) => {
    const{ year, make, model, content, userID} = req.body;

    if(!year || !make || !model || !content){
        return res.send('Please fill out all fields');
    }

    const query = 'SELECT car_ID from Car WHERE year = ? AND make = ? AND model = ?';
    db.query(query, [year,make,model], (err,results) => {
        if(err){
            console.error(err);
            return res.send('Server error');
        }

        if(results.length === 0){
            return res.send('Car not found');
        }

        const carID = results[0].car_ID;
        const insertReviewQuery = 'INSERT INTO Review (car_ID, user_ID, content) VALUES (?,?,?)';
        db.query(insertReviewQuery, [carID, userID, content], (err,results) =>{
            if(err){
                console.error(err);
                return res.send('Server error');
            }

            res.send('Review successfully submitted');
        });
    });
});

//gets data for a car based on year, make, and model
app.get('/carData', (req, res) => {
    const { make, model, year } = req.query;
    const query = `SELECT C.*, P.image_path
    FROM Car C, Photo P, Car_Has_Photo CHP
    WHERE make = ? AND model = ? AND year = ? AND C.car_ID = CHP.car_ID AND CHP.photo_ID = P.photo_ID`;
    
    db.query(query, [make, model, year], (err, results) => {
      if (err) {
        console.error(err);
        return res.send('Server error');
      }
      res.json(results[0]);
    });
  });

//gets a users saved cars
app.get('/savedCars', authenticateToken, (req,res) => {
    const userID = req.user.id;
    const query = `SELECT C.*, P.image_path 
    FROM Car C, Saved_Car SC, Photo P, Car_Has_Photo CHP 
    WHERE SC.car_ID = CHP.car_ID AND CHP.photo_ID = P.photo_ID AND SC.car_ID = C.car_ID AND SC.user_ID = ?`;

    db.query(query, [userID], (err, results) => {
        if(err){
            console.error(err);
            return res.send('Server error');
        }
        res.json(results);
    });
});

//creates a saved car for a user
app.post('/savedCar', authenticateToken, (req, res) => {
    const { carID, userID } = req.body;

    if (!carID || !userID) {
        console.error('Missing carID or userID:', req.body);
        return res.status(400).send('Error: Missing carID or userID');
    }

    const insertSavedCar = 'INSERT INTO Saved_Car (car_ID, user_ID) VALUES (?, ?)';
    db.query(insertSavedCar, [carID, userID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Server error');
        }

        res.send('Successfully saved');
    });
});

//gets reviews for a specific carID
app.get('/getReviews/:carID',(req,res) =>{
    const { carID } = req.params;
    if(!carID){
        console.error("No carID", req.body);
        return res.status(400).send('Error: Missing carID');
    }

    const query = `
        SELECT Review.content, Review.review_ID, User.name 
        FROM Review, User 
        WHERE Review.user_ID = User.user_ID 
        AND Review.car_ID = ?
    `;
    db.query(query, [carID], (err, results) => {
        if(err){
            console.error(err);
            return res.send('Server error');
        }
        res.json(results);
    });
});

//gets comments for a review
app.get('/getComments', (req, res) => {
    const query = `
        SELECT Comments.textualContent, Comments.review_ID, Comments.comment_ID, User.name 
        FROM Comments, User
        WHERE Comments.user_ID = User.user_ID
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.send('Server error');
        }
        res.json(results);
    });
});


//creates a comment for a review
app.post('/submitComment', authenticateToken, (req, res) => {
    const { reviewID, userID, content } = req.body;
    if (!reviewID || !userID || !content) {
        console.error('Missing parameters');
        return res.status(400).send('Missing reviewID, userID, or content');
    }
    const insertComment = 'INSERT INTO Comments (review_ID, user_ID, textualContent) VALUES (?, ?, ?)';
    db.query(insertComment, [reviewID, userID, content], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Server error');
        }
        res.send('Comment successfully saved');
    });
});

//deletes a saved car
app.delete('/savedCars/:carID', authenticateToken, (req,res) => {
    const userID = req.user.id;
    const carID = req.params.carID;

    const query = `DELETE FROM Saved_Car WHERE car_ID = ? and user_ID = ?`;

    db.query(query, [carID, userID], (err, results) => {
        if(err){
            console.error(err);
            return res.send('Server error');
        }
        res.send('Car succesfully deleted!');
    });
});

//gets likes for a review
app.get('/getReviewLikes/:carID', (req,res)=>{
    const carID = req.params.carID;
    const query = `
        SELECT Review.review_ID, Review.user_ID, COUNT(Review_Like.review_ID) AS like_count
        FROM Review, Review_Like
        WHERE Review.car_ID = ? AND Review.review_ID = Review_Like.review_ID
        GROUP BY Review.review_ID, Review.user_ID;
        `

    db.query(query,[carID], (err,results) =>{
        if(err){
            console.error(err);
            return res.send('Server error');
        }
        res.json(results)
    })
});

//get dislikes for a review
app.get('/getReviewDislikes/:carID', (req,res)=>{
    const carID = req.params.carID;
    const query = `
        SELECT Review.review_ID, Review.user_ID, COUNT(Review_Dislike.review_ID) AS like_count
        FROM Review, Review_Dislike
        WHERE Review.car_ID = ? AND Review.review_ID = Review_Dislike.review_ID
        GROUP BY Review.review_ID, Review.user_ID;
        `

    db.query(query,[carID], (err,results) =>{
        if(err){
            console.error(err);
            return res.send('Server error');
        }
        res.json(results)
    })
});

//gets comment likes
app.get('/getCommentLikes/:carID', (req,res)=>{
    const carID = req.params.carID;
    const query = `
        SELECT Comments.comment_ID, Comments.user_ID, COUNT(Comment_Like.comment_ID) AS like_count
        FROM Review, Comments, Comment_Like
        WHERE Review.car_ID = ? AND Review.review_ID = Comments.review_ID AND Comments.comment_ID = Comment_Like.comment_ID
        GROUP BY Comments.comment_ID, Comments.user_ID;
    `

    db.query(query,[carID], (err,results) =>{
        if(err){
            console.error(err);
            return res.send('Server error');
        }
        res.json(results);
    })
});

//gets dislikes for a comment
app.get('/getCommentDislikes/:carID', (req,res)=>{
    const carID = req.params.carID;
    const query = `
        SELECT Comments.comment_ID, Comments.user_ID, COUNT(Comment_Dislike.comment_ID) AS dislike_count
        FROM Review, Comments, Comment_Dislike
        WHERE Review.car_ID = ? AND Review.review_ID = Comments.review_ID AND Comments.comment_ID = Comment_Dislike.comment_ID
        GROUP BY Comments.comment_ID, Comments.user_ID;
    `

    db.query(query,[carID], (err,results) =>{
        if(err){
            console.error(err);
            return res.send('Server error');
        }
        res.json(results);
    })
});

//likes a review
app.post('/submitReviewLike', authenticateToken, (req, res) => {
    const { reviewID } = req.body;
    const userID = req.user.id;

    if (!reviewID || !userID) {
        return res.status(400).send('Missing reviewID or userID');
    }

    const insertReviewLike = 'INSERT INTO Review_Like (review_ID, user_ID) VALUES (?, ?)';
    db.query(insertReviewLike, [reviewID, userID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Server error');
        }

        res.send('Review liked successfully');
    });
});

//dislikes a review
app.post('/submitReviewDislike', authenticateToken, (req, res) => {
    const { reviewID } = req.body;
    const userID = req.user.id;

    if (!reviewID || !userID) {
        return res.status(400).send('Missing reviewID or userID');
    }

    const insertReviewDislike = 'INSERT INTO Review_Dislike (review_ID, user_ID) VALUES (?, ?)';
    db.query(insertReviewDislike, [reviewID, userID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Server error');
        }

        res.send('Review disliked successfully');
    });
});

//likes a comment
app.post('/submitCommentLike', authenticateToken, (req, res) => {
    const { commentID } = req.body;
    const userID = req.user.id;

    if (!commentID || !userID) {
        return res.status(400).send('Missing commentID or userID');
    }

    const insertCommentLike = 'INSERT INTO Comment_Like (comment_ID, user_ID) VALUES (?, ?)';
    db.query(insertCommentLike, [commentID, userID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Server error');
        }

        res.send('Comment liked successfully');
    });
});

//dislikes a comment
app.post('/submitCommentDislike', authenticateToken, (req, res) => {
    const { commentID } = req.body;
    const userID = req.user.id;

    if (!commentID || !userID) {
        return res.status(400).send('Missing commentID or userID');
    }

    const insertCommentLike = 'INSERT INTO Comment_Dislike (comment_ID, user_ID) VALUES (?, ?)';
    db.query(insertCommentLike, [commentID, userID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Server error');
        }

        res.send('Comment disliked successfully');
    });
});

app.get('/protected', authenticateToken, (req,res) => {
    res.send('This is a protected route');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})