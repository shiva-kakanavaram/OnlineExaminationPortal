const bcrypt = require('bcryptjs');
const db = require('../db'); 

// Signup function
exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    // Determine role based on email domain
    let role;
    if (email.includes('@student.com')) {
        role = 'student';
    } else if (email.includes('@admin.com')) {
        role = 'admin';
    } else {
        return res.status(400).json({ message: 'Invalid email domain for role assignment' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ message: 'Error processing request' });
        }

        // Insert user into users table
        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, email, hashedPassword, role], (err, result) => {
            if (err) {
                console.error('Error signing up:', err.sqlMessage); // Log specific SQL error
                return res.status(500).json({ message: 'Error signing up: ' + err.sqlMessage });
            }

            // Check if user was successfully created
            if (result.affectedRows === 0) {
                return res.status(500).json({ message: 'User creation failed' });
            }

            // Insert into students table if the role is 'student'
            if (role === 'student') {
                const studentSql = 'INSERT INTO students ( name, email) VALUES ( ?, ?)';
                db.query(studentSql, [name, email], (studentErr) => {
                    if (studentErr) {
                        console.error('Error inserting into students:', studentErr.sqlMessage); // Log specific SQL error
                        return res.status(500).json({ message: 'Error adding student to database: ' + studentErr.sqlMessage });
                    }
                    res.status(201).json({ message: 'Student registered successfully' });
                });
            } else {
                res.status(201).json({ message: 'Admin registered successfully' });
            }
        });
    });
};  


// Login function
exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare hashed password
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: 'Error processing request' });
            }

            if (isMatch) {
                res.status(200).json({
                    message: 'Login successful',
                    user_id: results[0].id, 
                    role: results[0].role  
                });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        });
    });
};


