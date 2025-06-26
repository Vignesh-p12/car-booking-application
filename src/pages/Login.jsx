import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../services/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Email login successful");
    } catch (error) {
      console.error("❌ Email login failed:", error.message);
      setErrorMsg(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("✅ Google login successful");
    } catch (error) {
      console.error("❌ Google login failed:", error.message);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleEmailLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <hr className="my-4" />

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}

export default Login;
