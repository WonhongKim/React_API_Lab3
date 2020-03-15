import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import "./bootstrap.min.css";

import Home from "./components/Home";
import CreateStudent from "./components/Createstudent";
import CourseManagement from "./components/CourseManagement";
import CreateCourse from "./components/CreateCourse";
import ErrorPage from "./components/ErrorPage";
import CourseList from "./components/CourseList";
import CourseUpdate from "./components/CourseUpdate";
import BuildTimeTable from "./components/BuildTimeTable";
import ViewTimeTable from "./components/ViewTimeTable";
import TimeTableUpdate from "./components/TimeTableUpdate";

function App(props) {
  return (
    <Router>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Navbar.Toggle aria-controls="navbarColor01" />
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
        <Route render={() => <CourseList />} path="/CourseList" />
        <Route render={() => <CourseUpdate />} path="/CourseUpdate/:id" />
        <Route render={() => <ErrorPage />} path="/ErrorPage" />
        <Route render={() => <BuildTimeTable />} path="/BuildTimeTable" />
        <Route render={() => <ViewTimeTable />} path="/ViewTimeTable" />
        <Route render={() => <TimeTableUpdate />} path="/TimeTableUpdate/:id" />
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
