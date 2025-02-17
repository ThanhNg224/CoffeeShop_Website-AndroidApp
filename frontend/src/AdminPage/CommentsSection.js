import React from 'react';
import PropTypes from 'prop-types';

const CommentsSection = ({ comments, handleDeleteComment }) => {
  return (
    <section>
      <h2>User Comments</h2>
      <table className="comments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Product</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.username}</td>
              <td>{comment.product_name}</td>
              <td>{comment.comment}</td>
              <td>
                <button className = 'delete-button' onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

CommentsSection.propTypes = {
  comments: PropTypes.array.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
};

export default CommentsSection;
