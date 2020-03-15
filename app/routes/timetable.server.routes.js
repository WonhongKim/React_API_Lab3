var timetable = require("../../app/controllers/timetable.server.controller");
var express = require("express");
var router = express.Router();

module.exports = function(app) {
  app.post("/api/buildtimetable", timetable.create);
  app.get("/api/viewtimetable", timetable.list);

  app
    .route("/api/timetableupdate/:timetableId")
    .get(timetable.read)
    .put(timetable.update)
    .delete(timetable.delete);

  app.param("timetableId", timetable.userByID);
};
