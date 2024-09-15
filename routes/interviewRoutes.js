const express = require('express');
const { scheduleInterview, getInterviews } = require('../controllers/interviewController');
const { scheduleInterviewValidator } = require('../validators/interviewValidator');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Schedule an interview
router.post('/interviews', auth(['interviewer']), scheduleInterviewValidator, scheduleInterview);

// Get interviews for a specific applicant
router.get('/interviews', auth(), getInterviews);

module.exports = router;
