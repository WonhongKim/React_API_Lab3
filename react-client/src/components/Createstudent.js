import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CourseUpdate(props) {
  const [student, setStudent] = useState({
    _id: "",
    email: "",
    password: "",
    studentnumber: "",
    name: "",
    program: ""
  });

  const apiUrl = "http://localhost:3000/api/studentcreate";

  const saveStudent = e => {
    e.preventDefault();
    const data = {
      email: student.email,
      password: student.password,
      studentnumber: student.studentnumber,
      name: student.name,
      program: student.program
    };
    axios
      .post(apiUrl, data)
      .then(result => {
        props.history.push("/CourseManagement");
      })
      .catch(error => {
        props.history.push("/ErrorPage");
      });
  };

  const onChange = e => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <Jumbotron>
            <h2 style={{ marginBottom: "30px" }}>Student registration</h2>
            <Form onSubmit={saveStudent}>
              <Form.Group>
                <Form.Label> Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  value={student.email}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={student.password}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Student Number</Form.Label>
                <Form.Control
                  type="text"
                  name="studentnumber"
                  id="studentnumber"
                  placeholder="Enter studentnumber"
                  value={student.studentnumber}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter name"
                  value={student.name}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Program</Form.Label>
                <Form.Control
                  type="text"
                  name="program"
                  id="program"
                  placeholder="Enter program"
                  value={student.program}
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

export default withRouter(CourseUpdate);
