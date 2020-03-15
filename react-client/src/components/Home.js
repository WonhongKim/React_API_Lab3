import { withRouter } from "react-router-dom";

import React from "react";

function Home(props) {
  return (
    <div className="jumbotron">
      <h1 className="display-3">Hello, Student</h1>
      <p className="lead">This is the site for Adding and modify your course</p>
      <hr className="my-4" />
      <p>
        First of all you need to sign up for processing your course resister.
      </p>
    </div>
  );
}

export default withRouter(Home);
