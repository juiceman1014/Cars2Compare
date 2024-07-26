import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

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

app.get('/', (req,res) => {
    res.send('Hello from the backend!');
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

app.post('/register', async(req,res) => {
    const{ name, password } = req.body;

    if(!name || !password){
        return res.send('Please provide a name and password');
    }

    try{
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


