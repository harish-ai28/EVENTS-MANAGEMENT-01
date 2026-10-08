import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch all events created
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      const url = editingEvent
        ? `/api/events/${editingEvent._id}`
        : '/api/events';
      const method = editingEvent ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setEditingEvent(null);
        fetchEvents();
      }
    } catch (err) {
      console.error('Error saving event:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const res = await fetch(`/api/events/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setEvents(events.filter((event) => event._id !== id));
        }
      } catch (err) {
        console.error('Error deleting event:', err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>Manage campus events and hackathons</p>
        </div>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setEditingEvent(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Close Form' : '+ Create New Event'}
        </button>
      </div>

      {showForm && (
        <div style={styles.formContainer}>
          <EventForm
            onSubmit={handleCreateOrUpdate}
            initialData={editingEvent || {}}
          />
        </div>
      )}

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.theadRow}>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="5" style={styles.emptyTd}>
                    No events found. Click "+ Create New Event" to add one.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event._id} style={styles.tr}>
                    <td style={styles.td}>
                      <strong>{event.title}</strong>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.categoryBadge}>
                        {event.category || 'General'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : 'TBA'}
                    </td>
                    <td style={styles.td}>{event.location}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.editBtn}
                        onClick={() => {
                          setEditingEvent(event);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(event._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '1100px',
    margin: '0 auto',
    fontFamily: 'inherit',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    margin: 0,
    fontSize: '26px',
    color: '#111827',
  },
  subtitle: {
    margin: '4px 0 0 0',
    color: '#6b7280',
    fontSize: '14px',
  },
  primaryBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  formContainer: {
    marginBottom: '30px',
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  theadRow: {
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
  },
  th: {
    padding: '14px 16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#4b5563',
    textTransform: 'uppercase',
  },
  tr: {
    borderBottom: '1px solid #f3f4f6',
  },
  td: {
    padding: '14px 16px',
    fontSize: '14px',
    color: '#374151',
    verticalAlign: 'middle',
  },
  categoryBadge: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
  },
  editBtn: {
    backgroundColor: '#fef3c7',
    color: '#b45309',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
    fontWeight: '500',
  },
  deleteBtn: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  emptyTd: {
    padding: '30px',
    textAlign: 'center',
    color: '#9ca3af',
  },
};

export default AdminDashboard;