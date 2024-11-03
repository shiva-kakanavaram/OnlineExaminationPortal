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
    const { student_id, exam_id } = req.body;
    console.log('Received student_id:', student_id, 'exam_id:', exam_id); // Log received data

    const sql = 'INSERT INTO registrations (student_id, exam_id) VALUES (?, ?)';
    db.query(sql, [student_id, exam_id], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Log database error
            return res.status(500).json({ message: 'Error registering for exam', error: err });
        }
        res.status(200).json({ message: 'Registered successfully' });
    });
};

