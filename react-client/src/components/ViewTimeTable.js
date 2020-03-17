import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { withRouter } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";

function ViewTimeTable(props) {
  const [screen, setScreen] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [timetable, setTimeTable] = useState([]);
  const [timetablesize, setTimetablesize] = useState();
  const apiUrl = "http://localhost:3000/api/viewtimetable";

  const CourseListChecker = async id => {
    try {
      const result = await axios(apiUrl);
      const collction = [];
      if (result.data !== undefined) {
        for (var i = 0; i < result.data.length; i++) {
          if (result.data[i].studentemail === id) {
            collction.push(result.data[i]);
            console.log(collction);
          }
        }
        setTimeTable(collction);
      }
      setShowLoading(false);
      if (result.data.length === 0) {
        setTimetablesize(0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  const readCookie = async () => {
    try {
      const res = await axios.get("/api/read_cookie");
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        CourseListChecker(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };
  const editTimetable = id => {
    props.history.push({
      pathname: "/TimeTableUpdate/" + id
    });
    console.log(id);
  };

  return (
    <div className="App">
      {timetablesize === 0 ? (
        <div>
          <p>Nohting Added Yet</p>
          <a href="/BuildTimeTable">Go to CreateCourse</a>
        </div>
      ) : (
        <div>
          <div className="row" style={{ marginTop: "40px" }}>
            <div className="col-4"></div>
            <div className="col-4">
              <Jumbotron>
                <h2 style={{ marginBottom: "30px" }}>Current course list</h2>
                {showLoading && (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                )}

                <ListGroup>
                  {timetable.map((item, idx) => (
                    <ListGroup.Item
                      key={idx}
                      action
                      onClick={() => {
                        editTimetable(item._id);
                      }}
                    >
                      <h3>{item.coursename}</h3>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <a
                  className="btn btn-primary btn-md"
                  style={{ marginTop: "30px" }}
                  href="/CourseManagement"
                >
                  Back
                </a>
              </Jumbotron>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(ViewTimeTable);
