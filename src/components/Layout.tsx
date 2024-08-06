import React, { useEffect } from 'react';
import Nav from './Nav';
import Header from './Header';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';
import { Dispatch } from 'redux';
import axios from 'axios';
import { User } from '../models/user';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  setUser: (user: User) => void;
  user: User;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ setUser, children }) => {
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get<User>('/user');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setUser]); // Ensure this runs only when `setUser` changes

  let header;

  if (location.pathname === '/' || location.pathname === '/backend') {
    header = <Header />;
  }

  return (
    <div>
      <Nav />
      <main>
        {header}
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
