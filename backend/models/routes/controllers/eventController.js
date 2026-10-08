const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event details', error: error.message });
  }
};

// @desc    Create a new event
// @route   POST /api/events
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      registrationDeadline,
      location,
      maxTeamSize,
      bannerUrl,
      rules,
    } = req.body;

    const newEvent = new Event({
      title,
      description,
      category,
      date,
      registrationDeadline,
      location,
      maxTeamSize,
      bannerUrl,
      rules,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};