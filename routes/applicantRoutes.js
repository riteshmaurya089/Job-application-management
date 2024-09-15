const express = require('express');
const { createApplicant, getApplicants, updateApplicantStatus, deleteApplicant } = require('../controllers/applicantController');
const { createApplicantValidator } = require('../validators/applicantValidator');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Create an applicant
router.post('/applicants', auth(['applicant', 'interviewer']), createApplicantValidator, createApplicant);

// Get applicants for a specific job
router.get('/applicants', auth(), getApplicants);

// Update applicant status
router.patch('/applicants/:applicantId', auth(['interviewer']), updateApplicantStatus);

// Delete an applicant
router.delete('/applicants/:applicantId', auth(['interviewer']), deleteApplicant);

module.exports = router;
