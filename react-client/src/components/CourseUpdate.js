import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import { withRouter } from "react-router-dom";

function CourseUpdate(props) {
  const [course, setNewCourse] = useState({
    _id: "",
    coursename: "",
    coursetype: "",
    courseprofessor: ""
  });
  const [courseStudents, setCourseStudents] = useState([]);
  const apiUrl =
    "http://localhost:3000/api/courseupdate/" + props.match.params.id;

  const apiUrlStudent =
    "http://localhost:3000/api/coursestudents/" + props.match.params.id;

  useEffect(() => {
    LoadCourse();
    LoadCourseStudent();
  }, []);

  const LoadCourseStudent = async () => {
    const result = await axios(apiUrlStudent);
    setCourseStudents(result.data);
  };

  const LoadCourse = async () => {
    const result = await axios(apiUrl);
    setNewCourse(result.data);
  };

  const updateCourse = e => {
    e.preventDefault();
    const data = {
      coursename: course.coursename,
      coursetype: course.coursetype,
      courseprofessor: course.courseprofessor
    };
    axios
      .put(apiUrl, data)
      .then(result => {
        props.history.push("/CourseList");
      })
      .catch(error => {
        props.history.push("/ErrorPage");
      });
  };

  const deleteCourse = id => {
    axios.delete(apiUrl).then(result => {
      props.history.push("/CourseList");
    });
  };

  const onChange = e => {
    e.persist();
    setNewCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <Jumbotron>
            <h2 style={{ marginBottom: "30px" }}>course edit</h2>
            <Form onSubmit={updateCourse}>
              <Form.Group>
                <Form.Label> coursename</Form.Label>
                <Form.Control
                  type="text"
                  name="coursename"
                  id="coursename"
                  placeholder="Enter coursename"
                  value={course.coursename}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>coursetype</Form.Label>
                <Form.Control
                  type="text"
                  name="coursetype"
                  id="coursetype"
                  placeholder="Enter coursetype"
                  value={course.coursetype}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>courseprofessor</Form.Label>
                <Form.Control
                  type="text"
                  name="courseprofessor"
                  id="courseprofessor"
                  placeholder="Enter courseprofessor"
                  value={course.courseprofessor}
                  onChange={onChange}
                />
              </Form.Group>

              <Button
                style={{ marginRight: "20px" }}
                variant="primary"
                type="submit"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={() => {
                  deleteCourse(course._id);
                }}
              >
                Delete
              </Button>
            </Form>
          </Jumbotron>
        </div>
        <div className="col-lg-4"></div>
      </div>

      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <Jumbotron>
            <h2 style={{ marginBottom: "30px" }}>Student List</h2>
            <p>Students who currently enrolled this course</p>
            <ListGroup>
              {courseStudents.map((item, idx) => (
                <ListGroup.Item key={idx}>
                  <p>{item.studentemail}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Jumbotron>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
}

export default withRouter(CourseUpdate);
