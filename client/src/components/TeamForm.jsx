import React, { useState } from 'react';

const TeamForm = ({ eventId, maxTeamSize = 4, onSubmit }) => {
  const [teamName, setTeamName] = useState('');
  const [leader, setLeader] = useState({ name: '', email: '', rollNo: '' });
  const [members, setMembers] = useState([]);

  const handleLeaderChange = (e) => {
    const { name, value } = e.target;
    setLeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMember = () => {
    if (members.length + 1 < maxTeamSize) {
      setMembers([...members, { name: '', email: '', rollNo: '' }]);
    }
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      eventId,
      teamName,
      leader,
      members,
    };
    if (onSubmit) {
      onSubmit(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <h3 style={styles.title}>Register Team</h3>
      <p style={styles.subtitle}>Max Team Size: {maxTeamSize} members</p>

      {/* Team Name */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Team Name *</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
          required
          style={styles.input}
        />
      </div>

      {/* Team Leader Section */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Team Leader Details</h4>
        <div style={styles.row}>
          <input
            type="text"
            name="name"
            placeholder="Leader Name *"
            value={leader.name}
            onChange={handleLeaderChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Leader Email *"
            value={leader.email}
            onChange={handleLeaderChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="rollNo"
            placeholder="Roll / Reg No *"
            value={leader.rollNo}
            onChange={handleLeaderChange}
            required
            style={styles.input}
          />
        </div>
      </div>

      {/* Dynamic Team Members Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h4 style={styles.sectionTitle}>
            Team Members ({members.length + 1}/{maxTeamSize})
          </h4>
          {members.length + 1 < maxTeamSize && (
            <button
              type="button"
              onClick={addMember}
              style={styles.addBtn}
            >
              + Add Member
            </button>
          )}
        </div>

        {members.map((member, index) => (
          <div key={index} style={styles.memberRow}>
            <input
              type="text"
              placeholder={`Member ${index + 2} Name`}
              value={member.name}
              onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="email"
              placeholder={`Member ${index + 2} Email`}
              value={member.email}
              onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Roll / Reg No"
              value={member.rollNo}
              onChange={(e) => handleMemberChange(index, 'rollNo', e.target.value)}
              required
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => removeMember(index)}
              style={styles.removeBtn}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button type="submit" style={styles.submitBtn}>
        Submit Registration
      </button>
    </form>
  );
};

const styles = {
  container: {
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
  title: {
    margin: 0,
    fontSize: '20px',
    color: '#111827',
  },
  subtitle: {
    margin: '0 0 10px 0',
    fontSize: '13px',
    color: '#6b7280',
  },
  section: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '600',
    color: '#374151',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '10px',
  },
  memberRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    flex: 1,
    padding: '9px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
  },
  addBtn: {
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    color: '#1f2937',
  },
  removeBtn: {
    backgroundColor: '#fee2e2',
    color: '#ef4444',
    border: 'none',
    borderRadius: '6px',
    width: '34px',
    height: '34px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  submitBtn: {
    marginTop: '12px',
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default TeamForm;