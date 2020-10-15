import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../layout/Spinner';
import { login } from '../../redux/actions/userActions';
import { ALERT_RESET } from '../../redux/actions/types';

const Login = ({ location, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading } = userLogin;

  const redirect = location.search && location.search.split('=')[1];

  if (userInfo) {
    if (redirect) {
      history.push(redirect);
    } else {
      history.goBack();
    }
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    return () => {
      dispatch({ type: ALERT_RESET });
    };
  }, []);

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>

      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmitHandler(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChangeHandler(e)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            minLength='6'
            name='password'
            value={password}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>

        <input type='submit' value='Login' className='btn btn-primary' />
        {loading && <Spinner />}
      </form>
      <p className='my-1'>
        Don't have an account?{' '}
        <Link to={`/register?redirect=${redirect}`}>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
