import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CREATE_USER } from '../graphql/mutations';
import { useDebouncedValue } from '../utilities/hooks';

export const RegisterPage = () => {
  const [formState, setFormState] = useState({ username: '', password: '', confirmPassword: '' });
  const [isTyping, setIsTyping] = useState({ username: false, password: false, confirmPassword: false });
  const [successMessage, setSuccessMessage] = useState(null);
  const debouncedUsername = useDebouncedValue(formState.username, 600);
  const debouncedPassword = useDebouncedValue(formState.password, 600);
  const debouncedConfirm = useDebouncedValue(formState.confirmPassword, 600);

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted(data) {
      const newUser = data.createUser.username;
      setSuccessMessage(`${newUser}, your account was successfully registered!`);
      setFormState({ username: '', password: '', confirmPassword: '' });
      setIsTyping({ username: false, password: false, confirmPassword: false });
    },
  });

  const onChange = (e, field) => {
    setFormState({ ...formState, [field]: e.target.value });

    if (!isTyping[field]) {
      setTimeout(() => {
        setIsTyping({ ...isTyping, [field]: true });
      }, 600);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateSubmission()) {
      createUser({ variables: formState });
      // Error message for existing username?
      // If user cannot be created, stay on this page and show an error
    } else {
      setIsTyping({ username: true, password: true, confirmPassword: true });
    }
  };

  const validateUsername = (input) => {
    if (input.length < 3 || input.length > 24) return false;
    if (input[0] === ' ' || input[input.length - 1] === ' ') return false;

    return true;
  };

  const validatePassword = (input) => {
    if (input.length < 8 || input.length > 24) return false;
    const validPassRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/;
    if (!validPassRegex.test(input)) return false;

    return true;
  };

  const validatePassConfirm = (input) => {
    if (!validatePassword(input)) return false;
    if (input !== formState.password) return false;

    return true;
  };

  const validateSubmission = () => {
    if (!validateUsername(formState.username)) return false;
    if (!validatePassword(formState.password)) return false;
    if (!validatePassConfirm(formState.confirmPassword)) return false;

    return true;
  };

  if (loading) return <p>Submitting...</p>;

  return (
    <section className="registration-page">
      <h2>Register a new account</h2>
      <form className="char-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="char-heading" htmlFor="username">
            username
            <input
              className="char-value"
              type="text"
              name="username"
              autoFocus
              value={formState.username}
              onChange={(e) => onChange(e, 'username')}
            />
          </label>
          {isTyping.username && !validateUsername(debouncedUsername) && (
            <span className="inline-error">Username must be between 3 and 24 characters</span>
          )}
        </div>
        <div className="input-container">
          <label className="char-heading" htmlFor="password">
            password
            <input
              className="char-value"
              type="text"
              name="password"
              value={formState.password}
              onChange={(e) => onChange(e, 'password')}
            />
          </label>
          {isTyping.password && !validatePassword(debouncedPassword) && (
            <span className="inline-error">
              Password must be between 8 and 24 characters and must contain a lowercase letter, uppercase letter,
              number, and special character
            </span>
          )}
        </div>
        <div className="input-container">
          <label className="char-heading" htmlFor="confirmPassword">
            confirm password
            <input
              className="char-value"
              type="text"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={(e) => onChange(e, 'confirmPassword')}
            />
          </label>
          {isTyping.confirmPassword && !validatePassConfirm(debouncedConfirm) && (
            <span className="inline-error">Passwords must match</span>
          )}
        </div>
        <button className="button large" type="submit">
          Submit
        </button>
      </form>
      {error && <p>A submission error occurred! {error.message}</p>}
      {successMessage && <p>{successMessage}</p>}
      <p>
        Already have an account?
        <br />
        <Link to="/login">Log in here.</Link>
      </p>
    </section>
  );
};
