const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import auth controller
const examController = require('../controllers/examController'); // Import exam controller

// Define signup and login routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Admin creates an exam
router.post('/admin/create-exam', examController.createExam);

// Student fetches available exams
router.get('/student/exams', examController.getExams);

// Student registers for an exam
router.post('/student/register-exam', examController.registerExam);

module.exports = router;
