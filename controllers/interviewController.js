const Interview = require('../models/Interview');
const Applicant = require('../models/Applicant');
const { validationResult } = require('express-validator');

// Schedule an interview
exports.scheduleInterview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { applicantId, interviewDate, interviewerName } = req.body;

  try {
    // Check if the applicant exists
    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    // Check for scheduling conflicts
    const conflict = await Interview.findOne({ applicantId, interviewDate });
    if (conflict) {
      return res.status(400).json({ message: 'Interview already scheduled for this applicant on the selected date' });
    }

    const interview = new Interview({ applicantId, interviewDate, interviewerName });
    await interview.save();

    res.status(201).json({ message: 'Interview scheduled successfully', interview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get interviews for a specific applicant
exports.getInterviews = async (req, res) => {
  const { applicantId } = req.query;

  try {
    const interviews = await Interview.find({ applicantId });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
