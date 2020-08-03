import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {

  const [text, setText] = useState('');

  const onSubmitHandler = e => {
    e.preventDefault();
    addComment(postId, { text });
    setText('');
  }

  return (
    <div class="post-form">
      <div class="post-form-header bg-primary">
        <h3>Leave a Comment</h3>
      </div>

      <form class="form my-1" onSubmit={onSubmitHandler}>
        <textarea
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <input type="submit" value="Submit" class="btn btn-dark my-1" />
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm);
