import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function BuildTimeTable(props) {
  const [screen, setScreen] = useState("");
  const [avilableCourse, setAvilableCourse] = useState([]);
  const [timetable, setNewTimetable] = useState({
    _id: "",
    studentemail: "",
    coursename: "",
    section: ""
  });

  const apiUrl = "http://localhost:3000/api/buildtimetable";
  const apiUrlgetCourse = "http://localhost:3000/api/courselist";

  const CourseListChecker = async () => {
    try {
      const course = await axios(apiUrlgetCourse);
      const collction = [];
      if (course.data !== undefined) {
        for (var i = 0; i < course.data.length; i++) {
          collction.push({
            label: course.data[i].coursename,
            value: course.data[i].coursename
          });
        }
        setAvilableCourse(collction);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveNewTimeTable = e => {
    e.preventDefault();
    const data = {
      studentemail: screen,
      coursename: timetable.coursename,
      section: timetable.section
    };
    axios
      .post(apiUrl, data)
      .then(result => {
        props.history.push("/CourseManagement");
      })
      .catch(error => {
        props.history.push("/ErrorPage");
      });
    console.log(data);
  };

  const readCookie = async () => {
    try {
      const res = await axios.get("/api/read_cookie");
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };
  useEffect(() => {
    readCookie();
    CourseListChecker();
  }, []);

  const onChange = e => {
    e.persist();
    setNewTimetable({ ...timetable, [e.target.name]: e.target.value });
    console.log(e);
    console.log(timetable);
  };

  return (
    <div className="app">
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <Jumbotron>
            <h2>Build Time Table</h2>
            <Form onSubmit={saveNewTimeTable}>
              <Form.Group>
                <Form.Label> studentemail</Form.Label>
                <Form.Control
                  type="text"
                  name="studentemail"
                  id="studentemail"
                  placeholder="Enter studentemail"
                  value={screen}
                  onChange={onChange}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Example select</Form.Label>
                <Form.Control
                  as="select"
                  name="coursename"
                  id="coursename"
                  value={timetable.coursename}
                  target={timetable.coursename}
                  onChange={onChange}
                >
                  {avilableCourse.map((e, key) => {
                    return (
                      <option key={key} value={e.value}>
                        {e.label}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label> section</Form.Label>
                <Form.Control
                  type="text"
                  name="section"
                  id="section"
                  placeholder="Enter section"
                  value={timetable.section}
                  onChange={onChange}
                />
              </Form.Group>

              <div>
                <Button
                  style={{ marginRight: "20px" }}
                  variant="primary"
                  type="submit"
                >
                  Save
                </Button>
                <a className="btn btn-warning btn-md" href="/CourseManagement">
                  Back
                </a>
              </div>
            </Form>
          </Jumbotron>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
}

export default withRouter(BuildTimeTable);
