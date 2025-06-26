import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";

function CarList() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      const carCollection = collection(db, "cars");
      const carSnapshot = await getDocs(carCollection);
      const carList = carSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCars(carList);
    };

    fetchCars();
  }, []);

  // 🔍 Filter by search input
  const filteredCars = cars.filter(car =>
    car.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Cars</h2>

      {/* 🔎 Search Box */}
      <input
        type="text"
        placeholder="Search by brand"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
      />

      <ul>
        {filteredCars.map(car => (
          <li key={car.id} className="border p-3 mb-2 rounded">
            <strong>{car.brand} {car.model}</strong> — ₹{car.price} ({car.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarList;
