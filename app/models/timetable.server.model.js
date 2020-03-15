const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TimeTableSchema = new Schema({
  studentemail: {
    type: String,
    required: "coursename is required"
  },
  coursename: {
    type: String
  },
  section: {
    type: String
  }
});
TimeTableSchema.pre("save", function(next) {
  next();
});
TimeTableSchema.set("toJSON", {
  getters: true,
  virtuals: true
});
mongoose.model("TimeTable", TimeTableSchema);
