import { useState } from "react";
import { registerUser } from "./api"; 
import './LoginandSign.css'

export default function SignUp({setAlert, setToken, setPage }) {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ username, email, password }); 
      setToken(res.token);
      setAlert({ show: true, type: "success", message: "SignUp Successfully" });
      setPage("app");
    } catch (err) {
      console.error(err);
        setAlert({ show: true, type: "error", message: "SignUp Failed" });
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <div className="incon">
        <label>Name</label>
        <input type="text" value={username} onChange={e => setName(e.target.value)} />
        <br /><br />
        <label>Email Address</label><br />
        <input type="email" placeholder="your@gmail.com" className="inp1" value={email} onChange={e => setEmail(e.target.value)} />
        <br /><br />
        <label>Password:</label><br />
        <input type="password" placeholder="Confirm Password" className="inp2" value={password} onChange={e => setPassword(e.target.value)} />
        <br /><br />
        <button  className='signup' onClick={handleSignUp}>SignUp</button>
      </div>
    </div>
  );
}
