const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // For environment variables

const app = express();
const PORT = process.env.PORT || 3000;



// Define User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);


// Middleware to parse incoming JSON requests and cookies
const corsOptions = {
    origin: ['https://main--habeshshops.netlify.app', 'http://localhost:5500','http://127.0.0.1:5500'],

    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods 
    allowedHeaders: ['Content-Type', 'Authorization'],

};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send('Welcome to the server side')
})

// POST endpoint to handle user sign-up
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }


    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'Failed to save user information' });
    }
});

// POST endpoint to handle user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  
// MongoDB connection
mongoose.connect("mongodb+srv://alazarzerubabel:n3TtFovvBSOvHfGM@habesha.34uir.mongodb.net/?retryWrites=true&w=majority&appName=Habesha")
.then(() =>{
    console.log('Connected to MongoDB Atlas')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
  .catch(err => console.error('Failed to connect to MongoDB:', err));
