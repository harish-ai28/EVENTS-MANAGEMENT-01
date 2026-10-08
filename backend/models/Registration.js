const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Member email is required'],
      trim: true,
      lowercase: true,
    },
    rollNo: {
      type: String,
      required: [true, 'Roll number is required'],
      trim: true,
    },
  },
  { _id: false }
);

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event reference is required'],
    },
    teamName: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
    },
    leader: {
      name: {
        type: String,
        required: [true, 'Team leader name is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Team leader email is required'],
        trim: true,
        lowercase: true,
      },
      rollNo: {
        type: String,
        required: [true, 'Team leader roll number is required'],
        trim: true,
      },
    },
    members: [memberSchema],
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Rejected'],
      default: 'Confirmed',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Registration', registrationSchema);