import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../redux/actions/userActions';

const Navbar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>

      <li>
        <Link to='/posts'>Posts</Link>
      </li>

      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>

      <li>
        <a onClick={logoutHandler}>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      <Fragment>{userInfo ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

export default Navbar;
