import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/events/my-registrations');
      const data = await res.json();
      setRegisteredEvents(data);
    } catch (err) {
      console.error('Error fetching registered events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (registrationId) => {
    if (window.confirm('Are you sure you want to cancel your registration?')) {
      try {
        const res = await fetch(`/api/events/registrations/${registrationId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setRegisteredEvents((prev) =>
            prev.filter((item) => item._id !== registrationId)
          );
        }
      } catch (err) {
        console.error('Error cancelling registration:', err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Registered Events & Hackathons</h1>
        <p style={styles.subtitle}>
          Track your participations, team details, and upcoming schedules
        </p>
      </div>

      {loading ? (
        <div style={styles.centerText}>Loading your events...</div>
      ) : registeredEvents.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyMessage}>You haven't registered for any events yet.</p>
          <Link to="/events" style={styles.exploreBtn}>
            Explore Events
          </Link>
        </div>
      ) : (
        <div style={styles.grid}>
          {registeredEvents.map((item) => (
            <div key={item._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.badge}>{item.event?.category || 'Event'}</span>
                <span style={styles.statusBadge}>Registered</span>
              </div>

              <h3 style={styles.eventTitle}>{item.event?.title || 'Event Name'}</h3>

              <div style={styles.metaInfo}>
                <p>📅 <strong>Date:</strong> {item.event?.date ? new Date(item.event.date).toLocaleDateString() : 'TBA'}</p>
                <p>📍 <strong>Location:</strong> {item.event?.location || 'Campus'}</p>
                <p>👥 <strong>Team:</strong> {item.teamName || 'Individual'}</p>
              </div>

              <div style={styles.cardActions}>
                <Link to={`/events/${item.event?._id}`} style={styles.viewBtn}>
                  View Event
                </Link>
                <button
                  onClick={() => handleCancelRegistration(item._id)}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '30px 20px',
    fontFamily: 'inherit',
  },
  header: {
    marginBottom: '28px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 6px 0',
  },
  subtitle: {
    fontSize: '15px',
    color: '#6b7280',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  badge: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statusBadge: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: '18px',
    color: '#1f2937',
    margin: '0 0 12px 0',
  },
  metaInfo: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  cardActions: {
    display: 'flex',
    gap: '10px',
    marginTop: 'auto',
  },
  viewBtn: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '8px 12px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
  cancelBtn: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#f9fafb',
    borderRadius: '10px',
    border: '1px dashed #d1d5db',
  },
  emptyMessage: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '16px',
  },
  exploreBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    display: 'inline-block',
  },
  centerText: {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280',
  },
};

export default MyEvents;