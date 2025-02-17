import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './User.css';

const Comments = ({ productId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/menu/${productId}/comments`)
      .then(response => setComments(response.data))
      .catch(err => console.error('Error fetching comments:', err));
  }, [productId]);

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-header">{comment.username}</div>
          <div className="comment-body">{comment.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
