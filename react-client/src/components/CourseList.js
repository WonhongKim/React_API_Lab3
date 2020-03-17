import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";

function CourseList(props) {
  const [showLoading, setShowLoading] = useState(true);
  const [courselist, setCourslist] = useState([]);
  const [coursesize, setCourssize] = useState();
  const apiUrl = "http://localhost:3000/api/courselist";

  const CourseListChecker = async () => {
    try {
      const result = await axios(apiUrl);
      if (result.data !== undefined) {
        setCourslist(result.data);
      }
      if (result.data.length === 0) {
        setCourssize(0);
      }
      setShowLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    CourseListChecker();
  }, []);

  const editCourse = id => {
    props.history.push({
      pathname: "/CourseUpdate/" + id
    });
    console.log(id);
  };

  return (
    <div className="App">
      {coursesize === 0 ? (
        <div>
          <p>Nohting Added Yet</p>
          <a href="/CreateCourse">Go to CreateCourse</a>
        </div>
      ) : (
        <div className="App">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
              <Jumbotron>
                <h2>Current course list</h2>
                {showLoading && (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                )}
                <ListGroup>
                  {courselist.map((item, idx) => (
                    <ListGroup.Item
                      key={idx}
                      action
                      onClick={() => {
                        editCourse(item._id);
                      }}
                    >
                      CourseName : {item.coursename} CourseType :
                      {item.coursetype}
                      Courseprofessor : {item.courseprofessor}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Jumbotron>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(CourseList);
