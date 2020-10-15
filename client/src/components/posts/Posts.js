import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { loadPage } from '../../redux/actions/postActions';
import { POST_LOAD_PAGE_RESET, ALERT_RESET } from '../../redux/actions/types';

const Posts = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) history.push('/login?redirect=posts');

  const postLoadPage = useSelector((state) => state.postLoadPage);
  const {
    hasMore,
    addedPosts,
    posts,
    loading,
    loadingPost,
    loadingPage,
  } = postLoadPage;

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: POST_LOAD_PAGE_RESET });
      dispatch({ type: ALERT_RESET });
    };
  }, []);

  const loadPosts = () => {
    if (!loadingPage) {
      dispatch(loadPage());
    }
  };

  const addedPostsItems = addedPosts.map((post) => (
    <PostItem key={post._id} post={post} />
  ));

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community
      </p>
      <PostForm />
      {loadingPost && (
        <Spinner style={{ width: '300px', margin: 'auto', display: 'block' }} />
      )}
      {addedPosts.length > 0 && addedPostsItems}
      {posts && (
        <InfiniteScroll hasMore={hasMore} loadMore={loadPosts}>
          <div className='posts'>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </Fragment>
  );
};

export default Posts;
