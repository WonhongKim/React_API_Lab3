const TimeTable = require("mongoose").model("TimeTable");
const config = require("../../config/config");

exports.create = function(req, res, next) {
  var timeTable = new TimeTable(req.body);

  timeTable.save(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(timeTable);
    }
  });
};

exports.list = function(req, res) {
  TimeTable.find().exec((err, timeTable) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(timeTable);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.timeTable);
};

// 'userByID' controller method to find a user by its id
exports.userByID = function(req, res, next, id) {
  // Use the 'User' static 'findOne' method to retrieve a specific user
  TimeTable.findOne(
    {
      _id: id
    },
    (err, timeTable) => {
      if (err) {
        // Call the next middleware with an error message
        return next(err);
      } else {
        // Set the 'req.user' property
        req.timeTable = timeTable;
        console.log(timeTable);
        // Call the next middleware
        next();
      }
    }
  );
};

exports.update = function(req, res, next) {
  console.log(req.body);
  TimeTable.findByIdAndUpdate(req.timeTable.id, req.body, function(
    err,
    timeTable
  ) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(timeTable);
  });
};

exports.delete = function(req, res, next) {
  TimeTable.findByIdAndRemove(req.timeTable.id, req.body, function(
    err,
    timeTable
  ) {
    if (err) return next(err);
    res.json(timeTable);
  });
};
