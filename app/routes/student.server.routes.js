var student = require("../../app/controllers/student.server.controller");
var express = require("express");
var router = express.Router();

module.exports = function(app) {
  app.post("/api/studentcreate", student.create);
};
