import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import {
  getCurrentProfile,
  deleteAccount,
} from '../../redux/actions/profileActions';
import { ALERT_RESET } from '../../redux/actions/types';

const Dashboard = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) history.push('/login?redirect=dashboard');

  const profileCurrent = useSelector((state) => state.profileCurrent);
  const { profile, deleted, loading } = profileCurrent;

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []); /* DON'T FORGET RERENDER WHEN DELETE=SUCCESS */

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [deleted]);

  useEffect(() => {
    return () => {
      dispatch({ type: ALERT_RESET });
    };
  }, []);

  const deleteAccountHandler = (profileId) => {
    // TODO
    console.log('Delete account: ', profileId);
    dispatch(deleteAccount());
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {userInfo && userInfo.name}
      </p>
      {profile ? (
        <Fragment>
          <DashboardActions />
          {profile.experience.length > 0 ? (
            <Experience experience={profile.experience} />
          ) : null}

          {profile.education.length > 0 ? (
            <Education education={profile.education} />
          ) : null}

          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={(e) => deleteAccountHandler(profile._id)}
            >
              <i className='fas fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not setup a profile yet, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
