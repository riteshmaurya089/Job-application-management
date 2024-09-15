const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Applicant',
    required: true,
  },
  interviewDate: {
    type: Date,
    required: true,
  },
  interviewerName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Interview', InterviewSchema);
