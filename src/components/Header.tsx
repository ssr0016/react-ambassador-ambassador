import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { User } from '../models/user';

// Define the shape of your state
interface State {
  user: User;
}

// mapStateToProps function
const mapStateToProps = (state: State) => ({
  user: state.user,
});

// connector using mapStateToProps
const connector = connect(mapStateToProps);

// Define props type using ConnectedProps
type PropsFromRedux = ConnectedProps<typeof connector>;

// Header component
const Header: React.FC<PropsFromRedux> = ({ user }) => {
  const [title, setTitle] = useState('Welcome');
  const [description, setDescription] = useState('Share links to earn money');

  useEffect(() => {
    if (user?.id) {
      setTitle(`$${user.revenue}`);
      setDescription('Share links to earn money');
    } else {
      setTitle('Welcome');
      setDescription('Please register or login to start earning');
    }
  }, [user]);

  let buttons;

  if (!user?.id) {
    buttons = (
      <p>
      <Link to="/login" className="btn btn-primary my-2">Login</Link>
      <Link to="/register" className="btn btn-secondary my-2">Register</Link>
    </p>
    );
  }


  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">{title}</h1>
            <p className="lead text-body-secondary">{description}</p>
            {buttons}
          </div>
        </div>
      </section>
    </div>
  );
};

// Export the connected component
export default connector(Header);
