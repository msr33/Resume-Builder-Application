import { useState } from "react";
import { loginUser } from "./api"; // use api function
import './LoginandSign.css'

export default function Login({setAlert, setMessage, setToken, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password }); // use api function
      setToken(res.token);
      setAlert({ show: true, type: "success", message: "Login Successfully" });
      setPage("app");
      
    } catch (err) {
      console.error(err);
      setAlert({ show: true, type: "error", message: "Invalid Credentials" });
    }
  };

  return (
    <div className="container">
      <h1>Log In</h1>
      <div className="incon">
        <label>Email Address</label><br />
        <input type="email" placeholder="your@gmail.com" className="inp1" value={email} onChange={e => setEmail(e.target.value)} />
        <br /><br />
        <label>Password:</label><br />
        <input type="password" placeholder="************" className="inp2" value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <a href="" style={{color:"grey", textDecoration:"underline", fontSize:"12px"}}>Forget Password?</a>
        <br /><br />
        <button id='login' onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
