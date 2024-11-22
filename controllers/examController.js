const db = require('../db');

exports.createExam = (req, res) => {
    const { title, date, duration, description } = req.body;
    const sql = 'INSERT INTO exams (title, date, duration, description) VALUES (?, ?, ?, ?)';

    db.query(sql, [title, date, duration, description], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error creating exam', error: err });
        }
        res.status(200).json({ message: 'Exam created successfully' });
    });
};

// Student fetches available exams
exports.getExams = (req, res) => {
    const sql = 'SELECT * FROM exams';
    
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching exams' });
        }
        res.status(200).json(results);
    });
};

// Student registers for an exam
exports.registerExam = (req, res) => {
    console.log('Request Body:', req.body); // Log the incoming request body
    const { exam_id, email } = req.body; // Destructure email and exam_id from the request body

    if (!email || !exam_id) {
        return res.status(400).json({ message: 'Missing email or exam ID' });
    }

    // Check if the student is already registered for the exam
    const checkRegistrationSql = 'SELECT * FROM registrations WHERE email = ? AND exam_id = ?';
    db.query(checkRegistrationSql, [email, exam_id], (err, results) => {
        if (err) {
            console.error('Database error during registration check:', err);
            return res.status(500).json({ message: 'Error checking registration' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'This student is already registered for this exam.' });
        }

        // Now proceed to register the student for the exam
        const sql = 'INSERT INTO registrations (email, exam_id) VALUES (?, ?)';
        db.query(sql, [email, exam_id], (err) => {
            if (err) {
                console.error('Database error during registration:', err);
                return res.status(500).json({ message: 'Error registering for exam', error: err });
            }
            res.status(200).json({ message: 'Registered successfully' });
        });
    });
};
