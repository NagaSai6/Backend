import mongoose from "mongoose";
import College from "../models/college.js";

const studentSchema = new mongoose.Schema({
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  name: { type: String },
  yearOfBatch: { type: Number, default: 2005 },
  skills: { type: Array, default: ["C", "Java", "C++", "Javascript"] },
});

const Student = mongoose.model("Student", studentSchema, "students");

export default Student;
