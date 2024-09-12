const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');  // Add express-session
const nodemailer = require('nodemailer');
require('dotenv').config(); // For environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests and cookies
const corsOptions = {
    origin: 'https://e-comm-web-projects.vercel.app', // Replace with your frontend origin
    credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());



// Helper function to save users to the JSON file
const saveUserToFile = (user) => {
    const filePath = path.join(__dirname, 'users.json');
    try {
        let users = [];
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            users = JSON.parse(fileData);
        }
        users.push(user);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        console.log('User saved successfully:', user);
    } catch (error) {
        console.error('Error saving user to file:', error);
    }
};

app.get('/',(req,res)=>{
    res.send('Welcome to the server side')
})

// POST endpoint to handle user sign-up
app.post('/signup', (req, res) => {
    const { nameing, email, phone, address, username, password } = req.body;

    if (!nameing || !email || !phone || !address || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newUser = {
        name: nameing,
        email: email,
        phone: phone,
        address: address,
        username: username,
        password: password,
    };

    try {
        saveUserToFile(newUser);
        res.status(201).json({ message: 'User signed up successfully' });
        alert("Log in please")
    } catch (error) {
        res.status(500).json({ error: 'Failed to save user information' });
    }
});

// POST endpoint to handle user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const filePath = path.join(__dirname, 'users.json');
        let users = [];
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath);
            users = JSON.parse(fileData);
        }

        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Store user info in the session
        
        req.session.user = user;
        sess = req.session.user
        

        
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
