// File: validators/jobValidator.js
const { body } = require('express-validator');

const validateJob = [
  body('title').notEmpty().withMessage('Job title is required'),
  body('department').notEmpty().withMessage('Department is required'),
  body('description').notEmpty().withMessage('Job description is required'),
  body('openDate').isISO8601().withMessage('Open date must be a valid date'),
];

module.exports = { validateJob };
