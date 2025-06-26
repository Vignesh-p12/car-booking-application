import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import "./AudiLogin.css";

const AudiLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = email === "2021ec0713@svce.ac.in";
      navigate(isAdmin ? "/admin" : "/dashboard");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const isAdmin = email === "2021ec0713@svce.ac.in";
      navigate(isAdmin ? "/admin" : "/dashboard");
    } catch (err) {
      alert("Google sign-in failed: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>
      <div className="login-form">
        <h2>Welcome to Audi Car Booking</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
          <div className="form-group">
            <button className="google-btn" type="button" onClick={handleGoogleLogin}>
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AudiLogin;
