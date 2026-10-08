import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const { _id, title, description, date, location, category, bannerUrl } = event;

  return (
    <div style={styles.card}>
      {bannerUrl && (
        <img
          src={bannerUrl}
          alt={title}
          style={styles.image}
        />
      )}
      <div style={styles.content}>
        <span style={styles.badge}>{category || 'Event'}</span>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>
          {description?.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        <div style={styles.meta}>
          <p>📅 {date ? new Date(date).toLocaleDateString() : 'TBA'}</p>
          <p>📍 {location || 'Campus'}</p>
        </div>
        <Link to={`/events/${_id}`} style={styles.button}>
          View Details
        </Link>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  content: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    color: '#1f2937',
  },
  description: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.4',
    marginBottom: '12px',
  },
  meta: {
    fontSize: '13px',
    color: '#4b5563',
    marginBottom: '16px',
  },
  button: {
    marginTop: 'auto',
    display: 'block',
    textAlign: 'center',
    backgroundColor: '#2563eb',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default EventCard;