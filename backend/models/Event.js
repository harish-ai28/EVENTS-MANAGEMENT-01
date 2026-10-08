const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    category: {
      type: String,
      enum: ['Hackathon', 'Workshop', 'Seminar', 'Cultural', 'Sports', 'Other'],
      default: 'Hackathon',
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    registrationDeadline: {
      type: Date,
    },
    location: {
      type: String,
      required: [true, 'Location/Venue is required'],
      trim: true,
    },
    maxTeamSize: {
      type: Number,
      default: 4,
      min: 1,
      max: 10,
    },
    bannerUrl: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', eventSchema);