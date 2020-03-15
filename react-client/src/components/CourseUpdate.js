import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import { withRouter } from "react-router-dom";

function CourseUpdate(props) {
  console.log(props.match.params.id);
  const [course, setNewCourse] = useState({
    _id: "",
    coursename: "",
    coursetype: "",
    courseprofessor: ""
  });
  const apiUrl =
    "http://localhost:3000/api/courseupdate/" + props.match.params.id;

  useEffect(() => {
    LoadCourse();
  }, []);

  const LoadCourse = async () => {
    const result = await axios(apiUrl);
    console.log(result.data);
    setNewCourse(result.data);
  };

  const updateCourse = e => {
    e.preventDefault();
    const data = {
      coursename: course.coursename,
      coursetype: course.coursetype,
      courseprofessor: course.courseprofessor
    };
    axios.put(apiUrl, data).then(result => {
      props.history.push("/CourseList");
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
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <Jumbotron>
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

              <Button variant="primary" type="submit">
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
    </div>
  );
}

export default withRouter(CourseUpdate);
