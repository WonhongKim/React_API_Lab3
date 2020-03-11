import React, { useState, useEffect, Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CreateStudent(props) {
  const [student, setStudent] = useState({
    _id: "",
    email: "",
    password: ""
  });

  const apiUrl = "http://localhost:3000/api/studentcreate";

  const saveStudent = e => {
    e.preventDefault();
    const data = {
      email: student.email,
      password: student.password
    };
    axios.post(apiUrl, data).then(result => {
      console.log(result);
    });
  };

  const onChange = e => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Jumbotron>
        <Form onSubmit={saveStudent}>
          <Form.Group>
            <Form.Label> email</Form.Label>
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

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateStudent);
