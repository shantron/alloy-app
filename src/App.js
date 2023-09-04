import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ApplicationForm from './ApplicationForm';
import ResponseApproved from './ResponseApproved';
import ResponseDenied from './ResponseDenied';
import ResponseReview from './ResponseReview';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<ApplicationForm />} />
          <Route path="/approved" element={<ResponseApproved />} />
          <Route path="/denied" element={<ResponseDenied />} />
          <Route path="/review" element={<ResponseReview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;