const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

const {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations,
  cancelRegistration,
} = require('../controllers/registrationController');

// ---------------------------------------------
// Registration Routes (Placed before /:id routes)
// ---------------------------------------------

// @route   GET /api/events/my-registrations
// @desc    Get all registrations of the current student/user
router.get('/my-registrations', getMyRegistrations);

// @route   DELETE /api/events/registrations/:id
// @desc    Cancel a registration by its ID
router.delete('/registrations/:id', cancelRegistration);

// ---------------------------------------------
// Event CRUD Routes
// ---------------------------------------------

// @route   GET /api/events
// @desc    Get all events / hackathons
// @route   POST /api/events
// @desc    Create a new event (Admin)
router.route('/')
  .get(getAllEvents)
  .post(createEvent);

// @route   GET /api/events/:id
// @desc    Get single event by ID
// @route   PUT /api/events/:id
// @desc    Update an event (Admin)
// @route   DELETE /api/events/:id
// @desc    Delete an event (Admin)
router.route('/:id')
  .get(getEventById)
  .put(updateEvent)
  .delete(deleteEvent);

// ---------------------------------------------
// Event-Specific Registration Actions
// ---------------------------------------------

// @route   POST /api/events/:id/register
// @desc    Register a team for this event
router.post('/:id/register', registerForEvent);

// @route   GET /api/events/:id/registrations
// @desc    Get list of all registered teams for this event (Admin)
router.get('/:id/registrations', getEventRegistrations);

module.exports = router;