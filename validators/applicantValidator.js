const { body } = require('express-validator');
const Job = require('../models/Job');

exports.createApplicantValidator = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('jobId').custom(async (jobId) => {
    const job = await Job.findById(jobId);
    if (!job) {
      return Promise.reject('Invalid job ID');
    }
  }),
];
