import React, { useEffect } from 'react';
import Nav from './Nav';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';
import { Dispatch } from 'redux';
import axios from 'axios';
import { User } from '../models/user';

interface LayoutProps {
  setUser: (user: User) => void;
  user: User;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ setUser, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get<User>('/user');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login'); // Redirect to the login page if there's an error
      }
    };

    fetchUserData();
  }, [navigate, setUser]);

  return (
    <div>
      <Nav />
      <main>
        <Header />
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
