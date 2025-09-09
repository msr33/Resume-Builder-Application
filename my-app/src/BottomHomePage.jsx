import { useEffect, useState } from "react";
import { PlusCircle, Edit, Download, Copy, Trash } from "lucide-react";
import { getResumes, deleteResume, createResume } from "./api"; 
import "./BottomHomePage.css";



export default function App({setAlert, setPage, token, resumes, setResumes, setResumePage }) {

  
  useEffect(() => {
    const fetchResumes = async () => {
      if (!token) return;
      try {
        const data = await getResumes(token);
        setResumes(data);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      }
    };
    fetchResumes();
  }, [token, setResumes]);


  const deleteRes = async (e, resumeId) => {
    e.stopPropagation();
    try {
      await deleteResume(resumeId, token);
      setAlert({ show: true, type: "success", message: "Resume Deleted" });
      setResumes(resumes.filter(r => r._id !== resumeId));
    } catch (err) {
      console.error(err);
            setAlert({ show: true, type: "error", message: "Failed To Delete" });
    }
  }

  const duplicateRes = async(e, resumeData)=>{
    e.stopPropagation();
     try {
          const { _id, ...duplicateData } = resumeData;

          const res = await createResume(duplicateData, token);
          setPage("app");
          setAlert({ show: true, type: "success", message: "Duplicate Resume Added" });
          setResumes([...resumes, res]);
          
        } catch (err) {
          console.error(err);
                setAlert({ show: true, type: "error", message: "Failed To Duplicate" });

      }
  }



  return (
    <div>
      
      <div className="create-resume">
        <button onClick={() => setPage("other")}>
          <PlusCircle size={18} /> Create New Resume
        </button>
      </div>

      <div className="resume-list">
        {resumes.length === 0 && <button id="noresume" onClick={() => setPage("other")}><PlusCircle size={50} /></button>}
        {resumes.map((resume) => (
          
            <div
              key={resume._id}
              className="resume-card"
              style={{ cursor: "pointer", color: "black" }}
              onClick={() => {
                setPage("showresume");    
                setResumePage(resume);    
              }}
            >
              <h2>{resume.name}</h2>
              <p>Last edited: {new Date(resume.createdAt).toLocaleDateString()}</p>
              <div className="resume-actions">
                <button style={{ color: "black" }} onClick={(e) =>{ e.stopPropagation(); setResumePage(resume); setPage("edit")}}><Edit size={16} /> Edit</button>
                <button style={{ color: "black" }} onClick={(e) => {e.stopPropagation(); setPage("showresume"); setResumePage(resume);}}><Download size={16} /> Download</button>
                <button style={{ color: "black" }} onClick={(e) => {duplicateRes(e,resume)}}><Copy size={16} /> Duplicate</button>
                <button className="delete" onClick={(e) => deleteRes(e, resume._id)}><Trash size={16} /> Delete</button>
              </div>
            </div>
        ))}
      </div>

    </div>
  )
}



