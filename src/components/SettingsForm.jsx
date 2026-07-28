import React, { useState } from 'react';
import './SettingsForm.css';

function SettingsForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (name === '') {
      newErrors.name = 'Name is required';
    }
    if (email === '') {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (theme === '') {
      newErrors.theme = 'Theme is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      console.log('Saved', { name, email, theme });
    } else {
      setSuccess(false);
    }
  };

  return (
    <div className="settings-form">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div>
          <label>Email Address</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div>
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="">Select</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          {errors.theme && <p style={{ color: 'red' }}>{errors.theme}</p>}
        </div>

        <button type="submit">Save</button>

        {success && <p style={{ color: 'green' }}>Settings saved!</p>}
      </form>
    </div>
  );
}

export default SettingsForm;