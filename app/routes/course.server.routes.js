var course = require("../../app/controllers/course.server.controller");
var express = require("express");
var router = express.Router();

module.exports = function(app) {
  app.post("/api/coursecreate", course.create);
};
