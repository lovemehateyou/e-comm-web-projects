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
    origin: 'http://127.0.0.1:5500', // Replace with your frontend origin
    credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// Use express-session for session management
app.use(session({
    secret: 'fikertalazareva11821996',  // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 30 * 24 * 60 * 60 * 1000 }  // Set secure: true if using HTTPS
}));
let sess = {}

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




// Nodemailer transporter setup (configure with your email credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variables for security
        pass: process.env.EMAIL_PASS // Use environment variables for security
    }
});

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

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    console.log(sess)
    if (sess) {
        next();
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
};

// POST endpoint to handle the Buy action
app.post('/buy', isAuthenticated, (req, res) => {
    const user =sess;
    
    const { name, price, size } = req.body; // Product info from request body

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: 'alazarzerubabel6@gmail.com', 
        subject: 'New Purchase',
        text: `User ${user.name} (${user.email}) has purchased ${size} of ${name} for a total of $${price}. 
               Shipping Address: ${user.address}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Purchase successful, email sent' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
