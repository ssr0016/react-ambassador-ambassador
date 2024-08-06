import React, { Dispatch, useState, useEffect, SyntheticEvent } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { User } from '../models/user';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';

// Define the types for props
type ProfileProps = {
  user: User;
  setUser: (user: User) => void;
};

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  const [firstName, setFirstName] = useState(user.first_name || '');
  const [lastName, setLastName] = useState(user.last_name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only update state if the user object changes
    setFirstName(user.first_name || '');
    setLastName(user.last_name || '');
    setEmail(user.email || '');
  }, [user]);

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put('/users/info', {
        first_name: firstName,
        last_name: lastName,
        email,
      });

      setUser(response.data);

      setSuccess('Profile updated successfully.');
      setError(null);
      console.log(response.data);
    } catch (error) {
      setError('Error updating profile.');
      setSuccess(null);
      console.error('Error updating user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== passwordConfirm) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put('/users/password', {
        password,
        password_confirm: passwordConfirm,
      });

      // Assuming the response contains the updated user object
      setUser(response.data);

      setSuccess('Password updated successfully.');
      setError(null);
      console.log(response.data);
    } catch (error) {
      setError('Error updating password.');
      setSuccess(null);
      console.error('Error updating user password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h3>Account Information</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={infoSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            className="form-control"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </Layout>
  );
};

// Define mapStateToProps and mapDispatchToProps
const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

// Connect Profile component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
