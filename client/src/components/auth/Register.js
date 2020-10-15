import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../layout/Spinner';
import { register } from '../../redux/actions/userActions';
import { setAlert } from '../../redux/actions/alertActions';
import { ALERT_RESET, USER_REGISTER_RESET } from '../../redux/actions/types';

const Register = ({ history, location }) => {
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading } = userRegister;

  if (userInfo) {
    if (redirect) {
      history.push(redirect);
    } else {
      history.goBack();
    }
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
      dispatch(
        register({
          name,
          email,
          password,
        })
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: ALERT_RESET });
      dispatch({ type: USER_REGISTER_RESET });
    };
  }, []);

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>

      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmitHandler(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChangeHandler(e)}
          />

          <small className='form-text'>
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>

        {loading && <Spinner />}

        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account?{' '}
        <Link to={`/login?redirect=${redirect}`}>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
