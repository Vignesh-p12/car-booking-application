// src/App.jsx
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth } from "./services/firebase";

// Pages & Components
import AddCarForm from "./components/AddCarForm";
import LogoutButton from "./components/LogoutButton";
import AdminDashboard from "./pages/AdminDashBoard";
import BookedCars from "./pages/BookedCars";
import LoginPage from "./pages/Loginpage";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const adminEmail = "2021ec0713@svce.ac.in"; // Change if needed

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
        {/* 🔝 Header */}
        <header className="bg-white shadow p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <h1 className="text-xl font-bold text-center md:text-left">🚗 Car Booking App</h1>
          <nav className="flex flex-wrap justify-center md:justify-end gap-4">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            {user.email === adminEmail && (
              <>
                <Link to="/admin" className="text-blue-600 hover:underline">Admin</Link>
                <Link to="/add-car" className="text-blue-600 hover:underline">Add Car</Link>
              </>
            )}
            <Link to="/booked" className="text-blue-600 hover:underline">Bookings</Link>
            <LogoutButton />
          </nav>
        </header>

        {/* 📦 Routes */}
        <Routes>
          <Route
            path="/"
            element={
              user.email === adminEmail ? <Navigate to="/admin" /> : <Navigate to="/user" />
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/booked" element={<BookedCars />} />
          <Route path="/add-car" element={
            user.email === adminEmail ? <AddCarForm /> : <Navigate to="/user" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
