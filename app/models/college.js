import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  yearFounded: { type: Number, default: 1971 },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: "India" },
  noOfStudents: { type: Number, default: 100 },
  coursesOffered: { type: Array, default: [] },
  score: { type: String },
  rank: { type: Number },
});

const College = mongoose.model("College", collegeSchema, "colleges");

export default College;
