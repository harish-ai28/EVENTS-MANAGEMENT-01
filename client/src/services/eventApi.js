const BASE_URL = '/api/events';

// Fetch all events
export const getAllEvents = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch events');
    return await res.json();
  } catch (error) {
    console.error('getAllEvents error:', error);
    throw error;
  }
};

// Fetch a single event by ID
export const getEventById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch event details');
    return await res.json();
  } catch (error) {
    console.error('getEventById error:', error);
    throw error;
  }
};

// Create a new event (Admin)
export const createEvent = async (eventData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    if (!res.ok) throw new Error('Failed to create event');
    return await res.json();
  } catch (error) {
    console.error('createEvent error:', error);
    throw error;
  }
};

// Update an existing event (Admin)
export const updateEvent = async (id, eventData) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    if (!res.ok) throw new Error('Failed to update event');
    return await res.json();
  } catch (error) {
    console.error('updateEvent error:', error);
    throw error;
  }
};

// Delete an event (Admin)
export const deleteEvent = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete event');
    return await res.json();
  } catch (error) {
    console.error('deleteEvent error:', error);
    throw error;
  }
};

// Register a team for an event
export const registerTeam = async (eventId, teamData) => {
  try {
    const res = await fetch(`${BASE_URL}/${eventId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData),
    });
    if (!res.ok) throw new Error('Failed to register team');
    return await res.json();
  } catch (error) {
    console.error('registerTeam error:', error);
    throw error;
  }
};

// Get registered events for current user/student
export const getMyRegistrations = async () => {
  try {
    const res = await fetch(`${BASE_URL}/my-registrations`);
    if (!res.ok) throw new Error('Failed to fetch registrations');
    return await res.json();
  } catch (error) {
    console.error('getMyRegistrations error:', error);
    throw error;
  }
};

// Cancel a registration
export const cancelRegistration = async (registrationId) => {
  try {
    const res = await fetch(`${BASE_URL}/registrations/${registrationId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to cancel registration');
    return await res.json();
  } catch (error) {
    console.error('cancelRegistration error:', error);
    throw error;
  }
};