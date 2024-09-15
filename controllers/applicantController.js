const Applicant = require('../models/Applicant');
const Job = require('../models/Job');
const { validationResult } = require('express-validator');

// Create a new applicant
exports.createApplicant = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { jobId, name, email, resumeLink, status } = req.body;

  try {
    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job ID not found' });
    }

    const applicant = new Applicant({ jobId, name, email, resumeLink, status });
    await applicant.save();

    res.status(201).json({ message: 'Applicant added successfully', applicant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve applicants for a specific job
exports.getApplicants = async (req, res) => {
  const { jobId } = req.query;

  try {
    const applicants = await Applicant.find({ jobId });
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update applicant status
exports.updateApplicantStatus = async (req, res) => {
  const { applicantId } = req.params;
  const { status } = req.body;

  try {
    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    applicant.status = status;
    await applicant.save();

    res.json({ message: 'Applicant status updated', applicant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an applicant
exports.deleteApplicant = async (req, res) => {
  const { applicantId } = req.params;

  try {
    const applicant = await Applicant.findByIdAndDelete(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    res.json({ message: 'Applicant deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
