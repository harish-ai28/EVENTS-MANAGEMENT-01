const express = require('express');
const router = express.Router();
const {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations,
  cancelRegistration,
} = require('../controllers/registrationController');

// @route   GET /api/registrations/my-registrations
// @desc    Get all registrations of the current student/user
router.get('/my-registrations', getMyRegistrations);

// @route   POST /api/registrations
// @desc    Register a team for an event (expects eventId in body)
router.post('/', registerForEvent);

// @route   GET /api/registrations/event/:id
// @desc    Get all registered teams for a specific event
router.get('/event/:id', getEventRegistrations);

// @route   DELETE /api/registrations/:id
// @desc    Cancel a registration by its ID
router.delete('/:id', cancelRegistration);

module.exports = router;