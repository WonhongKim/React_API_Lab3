import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CreateCourse(props) {
  const [course, setNewCourse] = useState({
    _id: "",
    coursename: "",
    coursetype: "",
    courseprofessor: ""
  });

  const apiUrl = "http://localhost:3000/api/coursecreate";

  const saveNewCourse = e => {
    e.preventDefault();

    const data = {
      coursename: course.coursename,
      coursetype: course.coursetype,
      courseprofessor: course.courseprofessor
    };
    if (data.coursename === "") {
      window.alert("Please add coursename");
    } else if (data.coursetype === "") {
      window.alert("Please add coursetype");
    } else if (data.courseprofessor === "") {
      window.alert("Please add courseprofessor");
    } else {
      axios
        .post(apiUrl, data)
        .then(result => {
          props.history.push("/CourseManagement");
        })
        .catch(error => {
          props.history.push("/ErrorPage");
        });
    }
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
            <Form onSubmit={saveNewCourse}>
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
            </Form>
          </Jumbotron>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
}

export default withRouter(CreateCourse);
