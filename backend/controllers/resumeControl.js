import Resume from "../models/Resume.js";
import User from "../models/User.js";



export const createResume = async (req, res) => {

  try {
    const newResume = new Resume(req.body);
    await newResume.save();
    req.user.resumes.push(newResume._id);
    await req.user.save();

    res.status(201).json(newResume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getResumes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("resumes");
    res.json(user.resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getResumeById = async (req, res) => {
  try {
    const id = req.params.id;
    // if (!req.user.resumes.map(String).includes(String(id)))
    //   return res.status(403).json({ message: "Not allowed" });

    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.json({ success: true,  data:resume });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.user.resumes.map(String).includes(String(id)))
      return res.status(403).json({ message: "Not allowed" });

    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });


    const snapshot = {
      name: resume.name,
      phone: resume.phone,
      email: resume.email,
      linkedin: resume.linkedin,
      summary: resume.summary,
      workExperience: resume.workExperience,
      skills: resume.skills,
      projects: resume.projects,
      createdAt: resume.createdAt
    };
    resume.versions.push({ snapshot });

   
    Object.assign(resume, req.body);
    await resume.save();

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteResume = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.user.resumes.map(String).includes(String(id)))
      return res.status(403).json({ message: "Not allowed" });

    await Resume.findByIdAndDelete(id);

    
    req.user.resumes = req.user.resumes.filter((r) => String(r) !== String(id));
    await req.user.save();

    res.json({ message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
