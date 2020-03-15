const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Schema = mongoose.Schema;

var StudentSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: "email is required",
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  password: {
    type: String,
    validate: [
      password => password && password.length > 6,
      "Password should be longer"
    ]
  },
  studentnumber: {
    type: String,
    unique: true,
    required: "student number is required"
  },
  name: {
    type: String,
    required: "Name is required"
  },
  program: {
    type: String,
    required: "program is required"
  }
});

StudentSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

StudentSchema.methods.authenticate = function(password) {
  return this.password === bcrypt.hashSync(password, saltRounds);
};

StudentSchema.set("toJSON", {
  getters: true,
  virtuals: true
});

mongoose.model("Student", StudentSchema);
