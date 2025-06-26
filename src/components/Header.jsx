// src/components/Header.jsx
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

function Header({ user }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow">
      <h2 className="text-xl font-bold">Second-Hand Car App</h2>
      <div className="flex items-center gap-4">
        <span>👤 {user.displayName}</span>
        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
