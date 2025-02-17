import React from 'react';

const FeedbackSection = ({ feedbacks }) => (
  <section>
    <h2>Feedback</h2>
    <table className="feedback-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Feedback</th>
          <th>Submitted At</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.map(feedback => (
          <tr key={feedback.id}>
            <td>{feedback.name}</td>
            <td>{feedback.email}</td>
            <td>{feedback.phone_number}</td>
            <td>{feedback.feedback}</td>
            <td>{new Date(feedback.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default FeedbackSection;
