import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../redux/actions/postActions';
import { POST_LOAD_SINGLE_RESET } from '../../redux/actions/types';

const Post = ({ match }) => {
  const dispatch = useDispatch();
  const postId = match.params.id;

  const postSingle = useSelector((state) => state.postSingle);
  const { loading, loadingComment, post } = postSingle;

  console.log('post: ', post);

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId]);

  useEffect(() => {
    return () => {
      dispatch({ type: POST_LOAD_SINGLE_RESET });
    };
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn block-on-mobile'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {loadingComment && (
          <Spinner
            style={{ width: '300px', margin: 'auto', display: 'block' }}
          />
        )}
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

export default Post;
