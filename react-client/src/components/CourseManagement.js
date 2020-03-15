import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function App(props) {
  const [screen, setScreen] = useState("auth");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/api/signin";
  const auth = async () => {
    try {
      const loginData = { auth: { email, password } };

      const res = await axios.post(apiUrl, loginData);

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const readCookie = async () => {
    try {
      console.log("--- in readCookie function ---");

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

  const deleteCookie = async () => {
    try {
      await axios.get("api/signout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  if (screen === "auth") {
    return (
      <div className="App" style={{ marginTop: "30px" }}>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <Jumbotron>
              <h2 style={{ marginBottom: "30px" }}>Log in</h2>
              <Form>
                <Form.Group>
                  <Form.Label> Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="Email"
                    id="Email"
                    placeholder="Enter Email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Password</Form.Label>
                  <Form.Control
                    type="Password"
                    name="Password"
                    id="Password"
                    placeholder="Enter Password"
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <button className="btn btn-primary btn-md" onClick={auth}>
                Login
              </button>
            </Jumbotron>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    );
  } else if (screen === "admin@admin.ca") {
    return (
      <div className="App">
        <p>Welcome </p>
        <a href="/CreateCourse">CreateCourse</a>
        <a href="/CourseList">CourseList</a>
        <button onClick={deleteCookie}>Log out</button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <p>Welcome {screen}</p>
        <a href="/BuildTimeTable">Build Time Table</a>
        <a href="/ViewTimeTable">ViewTimeTable</a>
        <button onClick={deleteCookie}>Log out</button>
      </div>
    );
  }
}

export default App;
