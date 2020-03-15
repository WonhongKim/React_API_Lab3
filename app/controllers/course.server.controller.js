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

// 'userByID' controller method to find a user by its id
exports.userByID = function(req, res, next, id) {
  // Use the 'User' static 'findOne' method to retrieve a specific user
  Course.findOne(
    {
      _id: id
    },
    (err, course) => {
      if (err) {
        // Call the next middleware with an error message
        return next(err);
      } else {
        // Set the 'req.user' property
        req.course = course;
        console.log(course);
        // Call the next middleware
        next();
      }
    }
  );
};

exports.update = function(req, res, next) {
  console.log(req.body);
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
