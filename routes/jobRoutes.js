const express = require('express');
const { validateJob } = require('../validators/jobValidator'); // Check this import
const { createJob, getJobs } = require('../controllers/jobController'); // Check this import
const router = express.Router();

// Define routes
router.post('/jobs', validateJob, createJob); // Ensure validateJob and createJob are defined
router.get('/jobs', getJobs); // Ensure getJobs is defined

module.exports = router;
