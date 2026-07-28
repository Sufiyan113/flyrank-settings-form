import { useState, useMemo, useCallback } from 'react';
import './SettingsForm.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues = {
  fullName: '',
  email: '',
  theme: '',
};

function validateField(name, value) {
  switch (name) {
    case 'fullName':
      return value.trim() === '' ? 'Full name is required' : '';
    case 'email':
      if (value.trim() === '') return 'Email address is required';
      if (!EMAIL_REGEX.test(value.trim())) {
        return 'Please enter a valid email address';
      }
      return '';
    case 'theme':
      return value === '' ? 'Please select a theme' : '';
    default:
      return '';
  }
}

function validateAll(values) {
  return {
    fullName: validateField('fullName', values.fullName),
    email: validateField('email', values.email),
    theme: validateField('theme', values.theme),
  };
}

export default function SettingsForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const isFormValid = useMemo(() => {
    const allErrors = validateAll(values);
    return Object.values(allErrors).every((err) => err === '');
  }, [values]);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      setSaveSuccess(false);
      if (touched[name]) {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      }
    },
    [touched]
  );

  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const allErrors = validateAll(values);
      setErrors(allErrors);
      setTouched({ fullName: true, email: true, theme: true });

      const valid = Object.values(allErrors).every((err) => err === '');
      if (valid) {
        setSaveSuccess(true);
      } else {
        setSaveSuccess(false);
      }
    },
    [values]
  );

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <h2 className="settings-form__title">Settings</h2>

      <div className="settings-form__field">
        <label htmlFor="fullName">
          Full Name <span className="settings-form__required">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          className={errors.fullName ? 'settings-form__input settings-form__input--error' : 'settings-form__input'}
        />
        {errors.fullName && (
          <p id="fullName-error" className="settings-form__error" role="alert">
            {errors.fullName}
          </p>
        )}
      </div>

      <div className="settings-form__field">
        <label htmlFor="email">
          Email Address <span className="settings-form__required">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={errors.email ? 'settings-form__input settings-form__input--error' : 'settings-form__input'}
        />
        {errors.email && (
          <p id="email-error" className="settings-form__error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="settings-form__field">
        <label htmlFor="theme">
          Theme <span className="settings-form__required">*</span>
        </label>
        <select
          id="theme"
          name="theme"
          value={values.theme}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.theme)}
          aria-describedby={errors.theme ? 'theme-error' : undefined}
          className={errors.theme ? 'settings-form__input settings-form__input--error' : 'settings-form__input'}
        >
          <option value="">Select a theme</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        {errors.theme && (
          <p id="theme-error" className="settings-form__error" role="alert">
            {errors.theme}
          </p>
        )}
      </div>

      <button type="submit" className="settings-form__save" disabled={!isFormValid}>
        Save
      </button>

      {saveSuccess && (
        <p className="settings-form__success" role="status">
          Settings saved successfully!
        </p>
      )}
    </form>
  );
}