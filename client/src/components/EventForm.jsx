import React, { useState } from 'react';

const EventForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'Hackathon',
    date: initialData.date ? initialData.date.substring(0, 10) : '',
    location: initialData.location || '',
    registrationDeadline: initialData.registrationDeadline
      ? initialData.registrationDeadline.substring(0, 10)
      : '',
    maxTeamSize: initialData.maxTeamSize || 4,
    bannerUrl: initialData.bannerUrl || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>
        {initialData._id ? 'Edit Event / Hackathon' : 'Create New Event'}
      </h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>Event Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g. Campus Hackathon 2026"
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="Hackathon">Hackathon</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      <div style={styles.row}>
        <div style={{ ...styles.formGroup, flex: 1 }}>
          <label style={styles.label}>Event Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={{ ...styles.formGroup, flex: 1 }}>
          <label style={styles.label}>Registration Deadline</label>
          <input
            type="date"
            name="registrationDeadline"
            value={formData.registrationDeadline}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.row}>
        <div style={{ ...styles.formGroup, flex: 1 }}>
          <label style={styles.label}>Location / Venue *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="e.g. Main Auditorium / Online"
            style={styles.input}
          />
        </div>

        <div style={{ ...styles.formGroup, flex: 1 }}>
          <label style={styles.label}>Max Team Size</label>
          <input
            type="number"
            name="maxTeamSize"
            min="1"
            max="10"
            value={formData.maxTeamSize}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Banner Image URL</label>
        <input
          type="url"
          name="bannerUrl"
          value={formData.bannerUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Description *</label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Enter details about rules, rounds, eligibility..."
          style={{ ...styles.input, resize: 'vertical' }}
        />
      </div>

      <button type="submit" style={styles.submitBtn}>
        {initialData._id ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '650px',
    margin: '20px auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    fontFamily: 'inherit',
  },
  heading: {
    margin: '0 0 12px 0',
    color: '#1f2937',
    fontSize: '22px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  row: {
    display: 'flex',
    gap: '16px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
  },
  submitBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default EventForm;