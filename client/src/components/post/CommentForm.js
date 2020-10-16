import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ALERT_RESET } from '../../redux/actions/types';
import { addComment } from '../../redux/actions/postActions';
import { setAlert } from '../../redux/actions/alertActions';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      dispatch(setAlert('Comment must contain text', 'danger'));
    } else {
      dispatch(addComment(postId, { text }));
    }
    setText('');
  };

  useEffect(() => {
    return () => {
      dispatch({ type: ALERT_RESET });
    };
  }, []);

  return (
    <div class='post-form'>
      <div class='post-form-header bg-primary'>
        <h3>Leave a Comment</h3>
      </div>

      <form class='form my-1' onSubmit={onSubmitHandler}>
        <textarea
          cols='30'
          rows='5'
          placeholder='Create a comment'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type='submit' value='Submit' class='btn btn-dark my-1' />
      </form>
    </div>
  );
};

export default CommentForm;
