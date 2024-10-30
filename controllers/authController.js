const bcrypt = require('bcryptjs');
const db = require('../db'); // Import the database connection from db.js

// Signup function
exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(sql, [name, email, hash], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user' });
            }
            res.status(200).json({ message: 'User registered successfully' });
        });
    });
};

// Login function
exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare hashed password
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                res.status(200).json({ message: 'Login successful', user: results[0] });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        });
    });
};
