import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";

import Home from "./components/Home";
import CreateStudent from "./components/Createstudent";
import CourseManagement from "./components/CourseManagement";
import CreateCourse from "./components/CreateCourse";
import ErrorPage from "./components/ErrorPage";

//
function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/createstudent">Sign Up</Nav.Link>
            <Nav.Link href="/CourseManagement">Course Mnangement</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Route render={() => <Home />} path="/home" />
        <Route render={() => <CreateStudent />} path="/createstudent" />
        <Route render={() => <CourseManagement />} path="/CourseManagement" />
        <Route render={() => <CreateCourse />} path="/CreateCourse" />
        <Route render={() => <ErrorPage />} path="/ErrorPage" />
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
