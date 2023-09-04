import React from 'react';
import './Response.css';

const ResponseApproved = () => {
  return (
    <div className="response-approved">
      <div className="response-content">
        <h2 className="response-title">Congratulations!</h2>
        <p className="response-message">Your application has been approved 🎉🎉🎉
        <br />
        Pleae check your email for further instructions.</p>
      </div>
    </div>
  );
};

export default ResponseApproved;

