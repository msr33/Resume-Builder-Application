import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, minlength: 10, maxlength: 15 },
  email: { type: String, required: true },
  linkedin: { type: String },

  summary: { type: String },

  workExperience: [
    {
      company: { type: String },
      joinYear: { type: Number },
      endYear: { type: Number },
      description: { type: String }
    }
  ],

  skills: {
    programmingLanguages: { type: [String] },
    frameworks: { type: [String] },
    tools: { type: [String] }
  },

  projects: [
    {
      title: { type: String },
      description: { type: String }
    }
  ],

  versions: [
    {
      snapshot: Object, // stores older version of resume
      createdAt: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;

