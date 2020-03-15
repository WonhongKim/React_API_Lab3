const Course = require("mongoose").model("Course");
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

/*
exports.create = function(req, res, next) {
  var course = new Course(req.body);
  course.save(function(err) {
    if (err) {
      return getErrorMessage(err);
    } else {
      res.json(course);
    }
  });
};
*/

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
        res.status(200).json(Course);
      }
    });
  });
};
