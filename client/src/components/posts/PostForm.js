import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ALERT_RESET } from '../../redux/actions/types';
import { addPost } from '../../redux/actions/postActions';
import { setAlert } from '../../redux/actions/alertActions';

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      dispatch(setAlert('Post must contain text', 'danger'));
    } else {
      dispatch(addPost({ text }));
    }
    setText('');
  };

  useEffect(() => {
    return () => {
      dispatch({ type: ALERT_RESET });
    };
  }, []);

  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary'>
        <h3>Say Something...</h3>
      </div>

      <form className='form my-1' onSubmit={onSubmitHandler}>
        <textarea
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type='submit' value='Submit' className='btn btn-dark my-1' />
      </form>
    </div>
  );
};

export default PostForm;
