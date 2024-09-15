const { body } = require('express-validator');
const Applicant = require('../models/Applicant');

exports.scheduleInterviewValidator = [
  body('interviewDate').isISO8601().toDate().withMessage('Please provide a valid interview date'),
  body('applicantId').custom(async (applicantId) => {
    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
      return Promise.reject('Invalid applicant ID');
    }
  }),
];
