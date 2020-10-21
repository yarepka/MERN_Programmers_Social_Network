import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { loadPage } from '../../redux/actions/profileActions';
import { PROFILE_LOAD_PAGE_RESET } from '../../redux/actions/types';

const Profiles = () => {
  const dispatch = useDispatch();

  const profileLoadPage = useSelector((state) => state.profileLoadPage);
  const { hasMore, profiles, loading, loadingPage } = profileLoadPage;

  useEffect(() => {
    loadProfiles();
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: PROFILE_LOAD_PAGE_RESET });
    };
  }, []);

  const loadProfiles = () => {
    if (!loadingPage) {
      dispatch(loadPage());
    }
  };

  const profileItems = profiles.map((profile) => {
    return <ProfileItem key={profile._id} profile={profile} />;
  });

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with
            developers
          </p>

          {loading ? (
            <Spinner />
          ) : (
            <div className='profiles'>
              <InfiniteScroll hasMore={hasMore} loadMore={loadProfiles}>
                {profileItems}
              </InfiniteScroll>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
