import { useState, useEffect } from "react";
import App from "./BottomHomePage";
import Login from "./Login";
import SignUp from "./SignUp";
import CreateResume from "./CreateResume";
import "./HomePage.css";
import ShowResume from "./ShowResume";
import { Heading2 } from "lucide-react";
import EditResume from "./EditResume";
import Alert from "./Alert";

export default function HomePage() {
  const [page, setPage] = useState("app"); 
  const [token, setToken] = useState(localStorage.getItem("token") || ""); 
  const [resumes, setResumes] = useState([]);
  const [resumePage, setResumePage] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
  }, [token]);

  return (
    <div>
      <div className="nav">
        <button
          className="dashboard"
          onClick={() => {
            setPage("app");
          }}
          style={{ borderRadius: "5px", padding: "5px", border: "none", backgroundColor:"white", fontSize:"30px" }}
        >
          {page === "app" && <span className="navtit">Dashboard</span>}
          {page !== "app" && <span className="navtit">Resume </span>}
        </button>

        <div className="buttons">
          {!token && (
            <>
              <button onClick={() => { setPage("signup"); setResumeTitle("Resume"); }}
                style={{ borderRadius: "5px", padding: "5px" }}>Sign Up</button>
              <button onClick={() => { setPage("login"); setResumeTitle("Resume"); }}
                style={{ borderRadius: "5px", padding: "5px" }}>Login</button>
            </>
          )} 
          {token && (
            <button onClick={() => { setToken(""); localStorage.removeItem("token"); setPage("login"); setAlert({ show: true, type: "success", message: "Logout Successfully" });}} 
              style={{ borderRadius: "5px", padding: "5px" }}>Logout</button>
          )}
        </div>
      </div>
      
      {alert.show === true && (<Alert  setAlert={setAlert}
    type={alert.type}
    message={alert.message}
        />
      )}

      {page === "app" && <App setAlert={setAlert}  setPage={setPage} token={token} resumes={resumes} setResumes={setResumes} setResumePage={setResumePage}/>}
      {page === "login" && <Login setAlert={setAlert} setToken={setToken} setPage={setPage} />}
      {page === "signup" && <SignUp  setAlert={setAlert} setToken={setToken} setPage={setPage} />}
      {page === "other" && <CreateResume setAlert={setAlert} token={token} setpage={setPage}/>}
     {page === "showresume" && resumePage && <ShowResume setAlert={setAlert} setPage={setPage} resume={resumePage} />}
     {page === "edit" && <EditResume resume={resumePage} setAlert={setAlert} setPage={setPage} token={token}/>}

    </div>
  );
}

