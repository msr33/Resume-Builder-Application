import { useEffect } from "react";
import "./Alert.css";

export default function Alert({ setAlert, type, message }) {
  const bgc = type === "success" ? "rgb(0, 201, 0)" : "red";

 
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => {
      setAlert({ show: false, type: "", message: "" });
    }, 2000);

    return () => clearTimeout(id);
  }, [message, setAlert]);

  return (
    <div className="alert" style={{ backgroundColor: bgc }}>
      {message}
    </div>
  );
}

