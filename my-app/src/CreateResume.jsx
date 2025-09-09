import { useState } from "react";
import { createResume } from "./api"; 
import './CreateResume.css';

export default function CreateResume({setAlert, token, setpage }) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [summary, setSummary] = useState("");

  if(!token){
    setpage("login");
    setAlert({ show: true, type: "success", message: "Login First" });
  }
  
  const [workExperience, setWorkExperience] = useState([
    { company: "", joinYear: "", endYear: "", description: "" }
  ]);


  const [programmingLanguages, setProgrammingLanguages] = useState("");
  const [frameworks, setFrameworks] = useState("");
  const [tools, setTools] = useState("");

 

  const [projects, setProjects] = useState([
    { title: "", description: "" }
  ]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email || !summary || !programmingLanguages || !frameworks || !tools) {
      return setAlert({ show: true, type: "error", message: "First fill all details" });
    }

    const resumeData = {
      name,
      phone,
      email,
      linkedin,
      summary,
      workExperience,
      skills: {
        programmingLanguages: programmingLanguages.split(",").map(s => s.trim()),
        frameworks: frameworks.split(",").map(s => s.trim()),
        tools: tools.split(",").map(s => s.trim())
      },
      projects
    };

    try {
      const res = await createResume(resumeData, token);
            setAlert({ show: true, type: "success", message: "Resume Created Successfully" });
      console.log(res);
    } catch (err) {
      console.error(err);
            setAlert({ show: true, type: "error", message: "Faild To Create Resume" });
    }
  };

  return (
    <div id="resume">
      <h2>Create Resume</h2>
      <div id="top">
        <label>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        
        <div className="phno">
          <label>Phno</label><br />
          <input type="number" value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>

        <div className="email">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <label>Linkedin Url</label>
        <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
      </div>

      <div id="bottom">
        <div>
          <h4>Summary</h4>
          <textarea value={summary} onChange={e => setSummary(e.target.value)} required />
        </div>

        <div>
          <h4>Work Experience</h4>
          {workExperience.map((we, idx) => (
            <div key={idx}>
              <label>Company Name</label>
              <input type="text" value={we.company} onChange={e => {
                const arr = [...workExperience];
                arr[idx].company = e.target.value;
                setWorkExperience(arr);
              }} required />
              
              <input type="number" placeholder="Year Of Join" value={we.joinYear} onChange={e => {
                const arr = [...workExperience];
                arr[idx].joinYear = e.target.value;
                setWorkExperience(arr);
              }} required />
              
              <input type="number" placeholder="Year of End" value={we.endYear} onChange={e => {
                const arr = [...workExperience];
                arr[idx].endYear = e.target.value;
                setWorkExperience(arr);
              }} />
              
              <label>Description</label>
              <textarea value={we.description} onChange={e => {
                const arr = [...workExperience];
                arr[idx].description = e.target.value;
                setWorkExperience(arr);
              }} />
            </div>
          ))}
        </div>

        <div>
          <h4>Skills</h4>
          <label>Programming Languages</label>
          <input type="text" value={programmingLanguages} onChange={e => setProgrammingLanguages(e.target.value)} placeholder="Java, Python..." required />
          <label>Frameworks</label>
          <input type="text" value={frameworks} onChange={e => setFrameworks(e.target.value)} placeholder="React.js, Springboot..." required />
          <label>Tools</label>
          <input type="text" value={tools} onChange={e => setTools(e.target.value)} placeholder="Git, VSCode..." required />
        </div>

        <div>
          <h4>Projects</h4>
          {projects.map((proj, idx) => (
            <div key={idx}>
              <label>Title</label>
              <input type="text" value={proj.title} onChange={e => {
                const arr = [...projects];
                arr[idx].title = e.target.value;
                setProjects(arr);
              }} required />
              <label>Description</label>
              <textarea value={proj.description} onChange={e => {
                const arr = [...projects];
                arr[idx].description = e.target.value;
                setProjects(arr);
              }} required />
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

