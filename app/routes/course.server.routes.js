var course = require("../../app/controllers/course.server.controller");
var express = require("express");
var router = express.Router();

module.exports = function(app) {
  app.post("/api/coursecreate", course.create);
  app.get("/api/courselist", course.list);

  app
    .route("/api/CourseUpdate/:userId")
    .get(course.read)
    .put(course.update)
    .delete(course.delete);

  app.route("/api/coursestudents/:userId").get(course.studentList);
  app.param("userId", course.userByID);
};
