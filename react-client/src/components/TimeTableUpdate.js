import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import { withRouter } from "react-router-dom";

function TimeTableUpdate(props) {
  console.log(props.match.params.id);
  const [timetable, setNewTimetable] = useState({
    _id: "",
    studentemail: "",
    coursename: "",
    section: ""
  });
  const apiUrl =
    "http://localhost:3000/api/timetableupdate/" + props.match.params.id;

  useEffect(() => {
    LoadTable();
  }, []);

  const LoadTable = async () => {
    const result = await axios(apiUrl);
    setNewTimetable(result.data);
  };

  const updateTable = e => {
    e.preventDefault();
    const data = {
      coursename: timetable.coursename,
      section: timetable.section
    };
    axios
      .put(apiUrl, data)
      .then(result => {
        props.history.push("/ViewTimeTable");
      })
      .catch(error => {
        props.history.push("/ErrorPage");
      });
  };

  const deleteTable = id => {
    axios.delete(apiUrl).then(result => {
      props.history.push("/ViewTimeTable");
    });
  };

  const onChange = e => {
    e.persist();
    setNewTimetable({ ...timetable, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <Jumbotron>
            <Form onSubmit={updateTable}>
              <Form.Group>
                <Form.Label> coursename</Form.Label>
                <Form.Control
                  type="text"
                  name="coursename"
                  id="coursename"
                  placeholder="Enter coursename"
                  value={timetable.coursename}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>section</Form.Label>
                <Form.Control
                  type="text"
                  name="section"
                  id="section"
                  placeholder="Enter section"
                  value={timetable.section}
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
                  deleteTable(timetable._id);
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

export default withRouter(TimeTableUpdate);
