import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const categories = ['All', 'Hackathon', 'Workshop', 'Seminar', 'Cultural', 'Sports'];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.container}>
      {/* Header Banner */}
      <div style={styles.header}>
        <h1 style={styles.title}>Explore Campus Events & Hackathons</h1>
        <p style={styles.subtitle}>
          Discover upcoming competitions, workshops, and student tech activities
        </p>
      </div>

      {/* Search and Filter Section */}
      <div style={styles.filterSection}>
        <input
          type="text"
          placeholder="Search events or hackathons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.categoryList}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...styles.categoryBtn,
                ...(selectedCategory === cat ? styles.activeCategoryBtn : {}),
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div style={styles.centerText}>Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <div style={styles.centerText}>No events found matching your criteria.</div>
      ) : (
        <div style={styles.grid}>
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
    fontFamily: 'inherit',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0,
  },
  filterSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '32px',
  },
  searchInput: {
    width: '100%',
    maxWidth: '500px',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    outline: 'none',
  },
  categoryList: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryBtn: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    color: '#4b5563',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  activeCategoryBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    borderColor: '#2563eb',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },
  centerText: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '16px',
    color: '#6b7280',
  },
};

export default Events;