import { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function Navbar({ user, adminEmail }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow mb-6">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🚗 Car Booking App</h1>
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className={`px-4 pb-4 md:flex md:items-center md:space-x-6 md:px-8 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <Link to="/" className="block text-blue-600 hover:underline py-1">Home</Link>
        {user.email === adminEmail && (
          <>
            <Link to="/admin" className="block text-blue-600 hover:underline py-1">Admin</Link>
            <Link to="/add-car" className="block text-blue-600 hover:underline py-1">Add Car</Link>
          </>
        )}
        <Link to="/booked" className="block text-blue-600 hover:underline py-1">View Bookings</Link>
        <LogoutButton />
      </nav>
    </header>
  );
}

export default Navbar;
