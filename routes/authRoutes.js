const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 
const examController = require('../controllers/examController'); 
const adminController = require('../controllers/adminController'); 

// Define signup and login routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Admin creates an exam
router.post('/admin/create-exam', examController.createExam);

// Student fetches available exams
router.get('/student/exams', examController.getExams);

// Student registers for an exam
router.post('/student/register-exam', examController.registerExam);

// Route to get the number of students registered for exams (admin functionality)
router.get('/admin/registered-students-count', adminController.getRegisteredStudentsCount);

module.exports = router;
