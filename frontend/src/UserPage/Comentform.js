import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const CommentForm = ({ productId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      axios.post(`http://localhost:8080/menu/${productId}/comment`, { comment, userId: user.id })
        .then(response => {
          setComment('');
          onCommentAdded();
        })
        .catch(err => console.error('Error submitting comment:', err));
    } else {
      alert('You must be logged in to comment.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
