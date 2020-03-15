import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { withRouter } from "react-router-dom";

function CourseList(props) {
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
        <div>
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
              <h2>Current course list</h2>
              <ListGroup>
                {courselist.map((item, idx) => (
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      editCourse(item._id);
                    }}
                  >
                    CourseName : {item.coursename} CourseType :{item.coursetype}
                    Courseprofessor : {item.courseprofessor}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
      )}
    </div>
  );
}

export default withRouter(CourseList);
