import React, { useState, useEffect } from 'react';
import { User } from '../models/user';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { clearUser } from '../redux/actions/setUserAction'; // Import clearUser action

const mapStateToProps = (state: { user: User, }) => ({
  user: state.user,
});

const mapDispatchToProps = {
  clearUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Nav: React.FC<PropsFromRedux> = ({ user, clearUser }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('/logout'); // Ensure this endpoint clears the user session
      clearUser(); // Clear user state in Redux
      setIsLoggedOut(true); // Trigger state update after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    if (isLoggedOut) {
      window.location.href = '/'; // Redirect to the main page
    }
  }, [isLoggedOut]);

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 link-secondary">Frontend</Link>
          </li>
          <li>
            <Link to="/backend" className="nav-link px-2">Backend</Link>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          {user && user.first_name ? (
            <>
              <button 
                type="button" 
                className="btn btn-outline-primary me-2"
                onClick={handleLogout}
              >
                Logout
              </button>
              <Link to="/profile" className="btn btn-primary">
                {user.first_name} {user.last_name}
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign-up</Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default connector(Nav);
