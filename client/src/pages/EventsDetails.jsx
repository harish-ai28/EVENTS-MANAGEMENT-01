import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TeamForm from '../components/TeamForm';

const EventsDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/events/${id}`);
      const data = await res.json();
      setEvent(data);
    } catch (err) {
      console.error('Error fetching event details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationSubmit = async (formData) => {
    try {
      const res = await fetch(`/api/events/${id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setRegistered(true);
        setShowRegisterModal(false);
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Network error while registering');
    }
  };

  if (loading) {
    return <div style={styles.centerContainer}>Loading event details...</div>;
  }

  if (!event) {
    return (
      <div style={styles.centerContainer}>
        <h2>Event not found</h2>
        <Link to="/events" style={styles.backLink}>← Back to Events</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/events" style={styles.backLink}>← Back to all events</Link>

      {event.bannerUrl && (
        <img
          src={event.bannerUrl}
          alt={event.title}
          style={styles.bannerImage}
        />
      )}

      <div style={styles.header}>
        <span style={styles.badge}>{event.category || 'Event'}</span>
        <h1 style={styles.title}>{event.title}</h1>
      </div>

      <div style={styles.grid}>
        <div style={styles.leftCol}>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>About the Event</h2>
            <p style={styles.description}>{event.description}</p>
          </section>

          {event.rules && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Rules & Guidelines</h2>
              <p style={styles.description}>{event.rules}</p>
            </section>
          )}
        </div>

        <div style={styles.rightCol}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>Event Information</h3>
            <div style={styles.infoItem}>
              <strong>📅 Date:</strong>
              <span>{event.date ? new Date(event.date).toLocaleDateString() : 'TBA'}</span>
            </div>
            <div style={styles.infoItem}>
              <strong>⏰ Deadline:</strong>
              <span>
                {event.registrationDeadline
                  ? new Date(event.registrationDeadline).toLocaleDateString()
                  : 'Open'}
              </span>
            </div>
            <div style={styles.infoItem}>
              <strong>📍 Venue:</strong>
              <span>{event.location || 'Campus'}</span>
            </div>
            <div style={styles.infoItem}>
              <strong>👥 Team Size:</strong>
              <span>Up to {event.maxTeamSize || 4} members</span>
            </div>

            {registered ? (
              <div style={styles.successBox}>
                ✅ You have successfully registered!
              </div>
            ) : (
              <button
                style={styles.registerBtn}
                onClick={() => setShowRegisterModal(true)}
              >
                Register Now
              </button>
            )}
          </div>
        </div>
      </div>

      {showRegisterModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button
              style={styles.closeBtn}
              onClick={() => setShowRegisterModal(false)}
            >
              ✕
            </button>
            <TeamForm
              eventId={event._id}
              maxTeamSize={event.maxTeamSize || 4}
              onSubmit={handleRegistrationSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '24px 20px',
    fontFamily: 'inherit',
  },
  centerContainer: {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '18px',
    color: '#4b5563',
  },
  backLink: {
    display: 'inline-block',
    marginBottom: '16px',
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '500',
  },
  bannerImage: {
    width: '100%',
    height: '320px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '24px',
  },
  header: {
    marginBottom: '24px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '32px',
    color: '#111827',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#1f2937',
    marginTop: 0,
    marginBottom: '12px',
  },
  description: {
    color: '#4b5563',
    lineHeight: '1.6',
    whiteSpace: 'pre-line',
    margin: 0,
  },
  rightCol: {
    position: 'relative',
  },
  infoCard: {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  infoTitle: {
    margin: '0 0 6px 0',
    fontSize: '16px',
    color: '#111827',
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#374151',
    borderBottom: '1px dashed #e5e7eb',
    paddingBottom: '8px',
  },
  registerBtn: {
    marginTop: '10px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  successBox: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#dcfce7',
    color: '#15803d',
    borderRadius: '6px',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '14px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modalContent: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '12px',
    maxWidth: '650px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '10px',
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: '#f3f4f6',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default EventsDetails;