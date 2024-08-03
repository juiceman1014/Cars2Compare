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

app.get('/', (req,res) => {
    res.send('Hello from the backend!');
})

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

//used by CarsSavedPage.jsx
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

//used by resultsPage.jsx
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

app.get('/getComments', (req, res) => {
    const query = `
        SELECT Comments.textualContent, Comments.review_ID, User.name 
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

app.get('/protected', authenticateToken, (req,res) => {
    res.send('This is a protected route');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})