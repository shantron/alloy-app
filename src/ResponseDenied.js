import React from 'react';
import './Response.css';

const ResponseDenied = () => {
  return (
    <div className="response-approved">
      <div className="response-content">
        <p className="response-message">We apologize, your application was not successful.
        <br />
        Perhaps if you had a different last name, you would have better luck.
        </p>
      </div>
    </div>
  );
};

export default ResponseDenied;