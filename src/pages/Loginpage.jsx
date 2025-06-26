// src/pages/LoginPage.jsx
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../services/firebase";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmail = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert("Google sign-in failed: " + error.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.image}></div>
        <div style={styles.form}>
          <h2 style={styles.title}>Welcome to Audi Car Booking</h2>
          <form onSubmit={loginWithEmail}>
            <div style={styles.group}>
              <label>Email</label>
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.group}>
              <label>Password</label>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.group}>
              <button style={styles.loginButton} type="submit">
                Login
              </button>
              <button
                style={styles.googleButton}
                type="button"
                onClick={loginWithGoogle}
              >
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat, sans-serif",
  },
  container: {
    display: "flex",
    width: "900px",
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  },
  image: {
    flex: 1,
    background: "url('https://i.postimg.cc/zBQ0y6Tf/bmw-3-0-csl-2022-04.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  form: {
    flex: 1,
    padding: "50px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#2c5364",
  },
  group: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#0077cc",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "10px",
  },
  googleButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#db4437",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default LoginPage;
