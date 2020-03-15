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
  // Set up the 'userId' parameter middleware
  //All param callbacks will be called before any handler of
  //any route in which the param occurs, and they will each
  //be called only once in a request - response cycle,
  //even if the parameter is matched in multiple routes
  app.param("userId", course.userByID);
};
