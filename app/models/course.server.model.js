const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CourseSchema = new Schema({
  coursename: {
    type: String,
    unique: true,
    required: "coursename is required"
  },
  coursetype: {
    type: String
  },
  courseprofessor: {
    type: String
  }
});
CourseSchema.pre("save", function(next) {
  next();
});
CourseSchema.set("toJSON", {
  getters: true,
  virtuals: true
});
mongoose.model("Course", CourseSchema);
