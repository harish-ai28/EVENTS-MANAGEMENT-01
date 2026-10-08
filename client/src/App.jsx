import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';

// Pages
import Events from './pages/Events';
import EventsDetails from './pages/EventsDetails';
import MyEvents from './pages/MyEvents';
import AdminDashboard from './pages/AdminDashboard';

// Components
import EventCard from './components/EventCard';
import EventForm from './components/EventForm';
import TeamForm from './components/TeamForm';

// API Services
import {
  getAllEvents,
  createEvent,
  registerTeam,
} from './services/eventApi';

// Stylesheet
import './App.css';

function App() {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    // Initial fetch check for server connectivity
    getAllEvents()
      .then((data) => {
        if (Array.isArray(data)) {
          setFeaturedEvents(data.slice(0, 3));
        }
      })
      .catch((err) => console.log('API sync status:', err.message));
  }, []);

  const handleQuickCreate = async (eventData) => {
    try {
      await createEvent(eventData);
      alert('Event created successfully!');
      window.location.href = '/events';
    } catch (err) {
      alert('Failed to create event: ' + err.message);
    }
  };

  const handleQuickRegister = async (teamData) => {
    try {
      if (!teamData.eventId) {
        alert('Please select an event to register.');
        return;
      }
      await registerTeam(teamData.eventId, teamData);
      alert('Team registered successfully!');
      window.location.href = '/my-events';
    } catch (err) {
      alert('Failed to register: ' + err.message);
    }
  };

  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <header className="navbar">
          <NavLink to="/events" className="nav-brand">
            🎓 Campus<span>Events</span>
          </NavLink>

          <nav className="nav-links">
            <NavLink
              to="/events"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Explore Events
            </NavLink>
            <NavLink
              to="/my-events"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              My Registrations
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Admin Dashboard
            </NavLink>
          </nav>
        </header>

        {/* Main Routes */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/events" replace />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventsDetails />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Standalone Route to Create Event */}
            <Route
              path="/create-event"
              element={
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                  <EventForm onSubmit={handleQuickCreate} />
                </div>
              }
            />

            {/* Standalone Route to Register Team */}
            <Route
              path="/register-team"
              element={
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                  <TeamForm onSubmit={handleQuickRegister} />
                </div>
              }
            />

            {/* Featured Events Showcase Component Route */}
            <Route
              path="/featured"
              element={
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                  <h2 style={{ marginBottom: '20px' }}>Featured Hackathons</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {featuredEvents.map((evt) => (
                      <EventCard key={evt._id} event={evt} />
                    ))}
                  </div>
                </div>
              }
            />

            <Route path="*" element={<Navigate to="/events" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 Campus Event & Hackathon Manager. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;