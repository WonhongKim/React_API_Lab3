const User = require("mongoose").model("Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

exports.create = function(req, res, next) {
  var user = new User(req.body);
  console.log("body: " + req.body.email);

  user.save(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};

exports.authenticate = function(req, res, next) {
  const email = req.body.auth.email;
  const password = req.body.auth.password;

  User.findOne({ email: email }, (err, student) => {
    if (err) {
      return next(err);
    } else {
      if (bcrypt.compareSync(password, student.password)) {
        const token = jwt.sign({ email: student.email }, jwtKey, {
          algorithm: "HS256",
          expiresIn: jwtExpirySeconds
        });

        res.cookie("token", token, {
          maxAge: jwtExpirySeconds * 1000,
          httpOnly: true
        });
        res.status(200).send({ screen: student.email });

        req.email = email;

        next();
      } else {
        res.json({
          status: "error",
          message: "Invalid username/password!!!",
          data: null
        });
      }
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.status("200").json({ message: "signed out" });
};

exports.isSignedIn = (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.send({ screen: "auth" }).end();
  }
  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }
  res.status(200).send({ screen: payload.email });
};
