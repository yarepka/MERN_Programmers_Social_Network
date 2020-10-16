import React, { Fragment, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../redux/actions/profileActions';
import {
  PROFILE_LOAD_SINGLE_RESET,
  PROFILE_LOAD_REPOS_RESET,
} from '../../redux/actions/types';

const Profile = ({ match }) => {
  const profileId = match.params.id;
  const dispatch = useDispatch();

  const profileSingle = useSelector((state) => state.profileSingle);
  const { profile, loading } = profileSingle;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getProfileById(profileId));
  }, [profileId]);

  useEffect(() => {
    return () => {
      dispatch({ type: PROFILE_LOAD_SINGLE_RESET });
      dispatch({ type: PROFILE_LOAD_REPOS_RESET });
    };
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light btn block-on-mobile back-to-profiles'>
            Back To Profiles
          </Link>
          {userInfo && userInfo._id === profile.user._id && (
            <Link to='/edit-profile' className='btn btn-dark btn block-on-mobile'>
              Edit Profile
            </Link>
          )}

          <div className='profile-grid my-1'>
            {/* Top & About */}
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            {/* Experience */}
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            {/* Education */}
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {/* Github Repositories */}
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
