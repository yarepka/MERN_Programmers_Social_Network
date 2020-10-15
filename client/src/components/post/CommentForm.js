import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addComment } from '../../redux/actions/postActions';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addComment(postId, { text }));
    setText('');
  };

  return (
    <div class='post-form'>
      <div class='post-form-header bg-primary'>
        <h3>Leave a Comment</h3>
      </div>

      <form class='form my-1' onSubmit={onSubmitHandler}>
        <textarea
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type='submit' value='Submit' class='btn btn-dark my-1' />
      </form>
    </div>
  );
};

export default CommentForm;
