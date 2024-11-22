const db = require('../db');

// Controller to fetch the number of students registered for each exam
exports.getRegisteredStudentsCount = (req, res) => {
    const sql = `
        SELECT exams.id, exams.title, COUNT(DISTINCT registrations.email) AS registered_count
        FROM exams
        LEFT JOIN registrations ON exams.id = registrations.exam_id
        GROUP BY exams.id;
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching registered students count:', err);
            return res.status(500).json({ message: 'Error fetching data' });
        }

        // Send the array of exams with their registered student count
        res.status(200).json(results); 
    });
};
