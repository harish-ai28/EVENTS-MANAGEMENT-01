const Registration = require('../models/Registration');
const Event = require('../models/Event');

// @desc    Register a team/user for an event
// @route   POST /api/events/:id/register (or /api/registrations/:eventId)
exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id || req.body.eventId;
    const { teamName, leader, members } = req.body;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check registration deadline if set
    if (event.registrationDeadline && new Date() > new Date(event.registrationDeadline)) {
      return res.status(400).json({ message: 'Registration deadline has passed' });
    }

    // Validate team size limit
    const totalMembers = 1 + (members ? members.length : 0);
    if (event.maxTeamSize && totalMembers > event.maxTeamSize) {
      return res.status(400).json({
        message: `Team size exceeds the maximum limit of ${event.maxTeamSize}`,
      });
    }

    // Create new registration record
    const registration = new Registration({
      event: eventId,
      teamName: teamName || 'Individual',
      leader,
      members: members || [],
    });

    const savedRegistration = await registration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to complete registration',
      error: error.message,
    });
  }
};

// @desc    Get all registrations for student / logged-in user
// @route   GET /api/events/my-registrations
exports.getMyRegistrations = async (req, res) => {
  try {
    // Populate event details so frontend can show title, date, and location
    const registrations = await Registration.find()
      .populate('event', 'title category date location bannerUrl')
      .sort({ createdAt: -1 });

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching registrations',
      error: error.message,
    });
  }
};

// @desc    Get all registrations for a specific event (Admin view)
// @route   GET /api/events/:id/registrations
exports.getEventRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      event: req.params.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching event registrations',
      error: error.message,
    });
  }
};

// @desc    Cancel / delete a registration
// @route   DELETE /api/events/registrations/:id
exports.cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: 'Registration record not found' });
    }

    res.status(200).json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error cancelling registration',
      error: error.message,
    });
  }
};