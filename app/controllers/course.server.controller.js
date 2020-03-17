const Course = require("mongoose").model("Course");
const TimeTable = require("mongoose").model("TimeTable");
const config = require("../../config/config");

const getErrorMessage = function(err) {
  var message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "Coursename already exists";
        break;

      default:
        message = "Something went wrong";
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

exports.create = function(req, res) {
  var course = new Course(req.body); //
  //
  Course.findOne({ coursename: req.body.coursename }, err => {
    if (err) {
      return getErrorMessage(err);
    }
  }).then(function() {
    course.save(err => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.status(200).json(course);
      }
    });
  });
};

exports.list = function(req, res, next) {
  Course.find({}, function(err, course) {
    if (err) {
      return next(err);
    } else {
      res.json(course);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.course);
};

exports.userByID = function(req, res, next, id) {
  Course.findOne(
    {
      _id: id
    },
    (err, course) => {
      if (err) {
        return next(err);
      } else {
        req.course = course;
        next();
      }
    }
  );
};

exports.update = function(req, res, next) {
  Course.findByIdAndUpdate(req.course.id, req.body, function(err, course) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(course);
  });
};

exports.delete = function(req, res, next) {
  Course.findByIdAndRemove(req.course.id, req.body, function(err, course) {
    if (err) return next(err);
    res.json(course);
  });
};

exports.studentList = function(req, res, next) {
  const courseName = req.course.coursename;
  console.log(courseName);
  TimeTable.find({ coursename: courseName }, function(err, timetable) {
    if (err) {
      return next(err);
    } else {
      res.json(timetable);
      console.log(timetable);
      next();
    }
  });
};
