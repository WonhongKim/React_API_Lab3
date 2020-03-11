// Load the module dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
var StudentSchema = new Schema({
  email: {
    type: String,
    // Validate the email format
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  password: {
    type: String,
    // Validate the 'password' value length
    validate: [
      password => password && password.length > 6,
      "Password should be longer"
    ]
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
