import React from 'react';
import { Link } from 'react-router-dom';

const Error404Page = () => {
  return (
    <div className="center-container">
      <h1>404 Page Not Found!</h1>
      <section className="error-container">
        <span className="four"><span className="screen-reader-text">4</span></span>
        <span className="zero"><span className="screen-reader-text">0</span></span>
        <span className="four"><span className="screen-reader-text">4</span></span>
      </section>
      <div className="link-container">
        <a className="btn"><Link to='/'>Home</Link></a>
      </div>
    </div>
  );
};

export default Error404Page;
