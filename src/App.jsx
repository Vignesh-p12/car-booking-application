// src/App.jsx
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth } from "./services/firebase";

// Pages
import AddCarForm from "./components/AddCarForm";
import LogoutButton from "./components/LogoutButton";
import AdminDashboard from "./pages/AdminDashBoard";
import BookedCars from "./pages/BookedCars";
import LoginPage from "./pages/Loginpage";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-20">🔄 Loading...</p>;
  if (!user) return <LoginPage />;

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">🚗 Car Booking App</h1>
          <nav className="flex gap-4">
            <Link to="/admin" className="text-blue-600 hover:underline">Admin</Link>
            <Link to="/user" className="text-blue-600 hover:underline">User</Link>
            <Link to="/booked" className="text-blue-600 hover:underline">Bookings</Link>
            <Link to="/add-car" className="text-blue-600 hover:underline">Add Car</Link>
            <LogoutButton />
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/booked" element={<BookedCars />} />
          <Route path="/add-car" element={<AddCarForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
