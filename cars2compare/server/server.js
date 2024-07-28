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

app.post('/register', async(req,res) => {
    const{ name, password } = req.body;

    if(!name || !password){
        return res.send('Please provide a name and password');
    }

    try{
        const checkUserQuery = 'SELECT * FROM USER WHERE name = ?';
        db.query(checkUserQuery, [name], async(err,results) => {
            if(err){
                console.error(err);
                return res.send('Server error');
            }

            if(results.length > 0){
                return res.status(409).send('Username already exists');
            }
        })

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO User (name, password) VALUES (?,?)';
        db.query(query, [name, hashedPassword], (err,results) => {

            if(err){
                console.error(err);
                return res.send('Server error');
            }

            res.send('User registered');
        });
    }catch(error){
        console.error(error);
        res.send('Server error');
    }
});

app.post('/login', (req, res) => {
    const{ name, password } = req.body;

    if(!name || !password){
        return res.send('Please provide a name and password');
    }

    const query = 'Select * FROM User WHERE name = ?';
    db.query(query, [name], async(err,results) => {
        if(err){
            console.error(err);
            return res.send('Server error');
        }

        if(results.length === 0){
            return res.send('User not found');
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.send('Invalid password');
        }

        const token = jwt.sign({id:user.ID, name: user.name}, process.env.JWT_SECRET, {
            expiresIn:'1h'
        });

        res.json({token});
    });
});

app.get('/protected', authenticateToken, (req,res) => {
    res.send('This is a protected rout');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})