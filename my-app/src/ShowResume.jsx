import { useState, useEffect } from "react";
import { findResume } from "./api"; 
import { downloadPDF } from "./downloadPdf";
import "./ShowResume.css";


export default function ShowResume({setAlert, setPage, resume }) {
  const data = resume;


  return (
    <div>
      
      <div className="resume-controls">
        <button id="back" onClick={() => setPage("app")}>Back</button>
        <button id="download" onClick={()=>{downloadPDF(resume); setAlert({ show: true, type: "success", message: "Download Successfully" })}}>Download as PDF</button>
      </div>

      
      <div className="resume" id="resume-content">
        <header className="resume-header">
          <h1>{data.name}</h1>
          <p>📞 {data.phone} &nbsp;&nbsp; ✉️ {data.email}</p>
          {data.linkedin && <p>🔗 {data.linkedin}</p>}
        </header>

        {data.summary && (
          <section>
            <h2>Summary</h2>
            <p>{data.summary}</p>
          </section>
        )}

        {data.workExperience && data.workExperience.length > 0 && (
          <section>
            <h2>Work Experience</h2>
            {data.workExperience.map((we, idx) => (
              <div key={idx} className="experience-item">
                <p><b>{we.title || "Company"}</b> — {we.company}</p>
                <p>{we.joinYear} – {we.endYear || "Present"}</p>
                {we.description && <ul><li>{we.description}</li></ul>}
              </div>
            ))}
          </section>
        )}

        {data.skills && (
          <section>
            <h2>Skills</h2>
            <ul>
              {data.skills.programmingLanguages?.length > 0 && (
                <li>Programming: {data.skills.programmingLanguages.join(", ")}</li>
              )}
              {data.skills.frameworks?.length > 0 && (
                <li>Frameworks: {data.skills.frameworks.join(", ")}</li>
              )}
              {data.skills.tools?.length > 0 && (
                <li>Tools: {data.skills.tools.join(", ")}</li>
              )}
            </ul>
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section>
            <h2>Projects</h2>
            {data.projects.map((proj, idx) => (
              <div key={idx} className="project-item">
                <p><b>{proj.title}</b></p>
                <p>{proj.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
