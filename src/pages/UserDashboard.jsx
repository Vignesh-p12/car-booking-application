// src/pages/UserDashboard.jsx
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import UserInfo from "../components/UserInfo";
import { auth, db } from "../services/firebase";

function UserDashboard() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCars = async () => {
    const snapshot = await getDocs(collection(db, "cars"));
    const list = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || data.Name || "Unnamed",
        imageUrl: data.imageUrl || data.ImageUrl || "/default-car.jpg",
        price: data.price || data.Price,
        mileage: data.mileage || data.Mileage,
        fuelType: data.fuelType || data.FuelType || data.Fuel,
        year: data.year || data.Year
      };
    });
    setCars(list);
  };

  const handleBook = async (car) => {
    await addDoc(collection(db, "requests"), {
      carId: car.id,
      carName: car.name,
      requestedAt: new Date(),
      userEmail: auth.currentUser?.email
    });
    alert(`✅ Booking request sent for ${car.name}`);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <UserInfo />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Available Cars</h1>
        <input
          type="text"
          placeholder="Search car"
          className="p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCars.map((car) => (
          <CarCard key={car.id} car={car} showBookButton onBook={() => handleBook(car)} />
        ))}
      </div>
    </div>
  );
}
export default UserDashboard;
