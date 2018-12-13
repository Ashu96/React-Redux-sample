import React from 'react';
import PropTypes from 'prop-types';

export default function UserProfile({ profile, handleChange, handleSubmit }) {
  return (
    <div className="container">
      <h1>{profile.isFetching ? 'Loading...' : 'Submit your details here'}</h1>
      {Object.keys(profile)
        .filter(i => i !== 'isFetching')
        .map(item => (
          <input
            key={item}
            data-id={item}
            className="input"
            value={profile[item]}
            onChange={event => handleChange(event.target.value, item)}
            type="text"
            placeholder={item.toLowerCase()}
          />
        ))}
      <button type="button" className="btn" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
}

UserProfile.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
