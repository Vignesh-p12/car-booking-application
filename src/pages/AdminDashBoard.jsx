// src/pages/AdminDashboard.jsx
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import AddCarForm from "../components/AddCarForm";
import CarCard from "../components/CarCard";
import LogoutButton from "../components/LogoutButton";
import UserInfo from "../components/UserInfo";
import { db } from "../services/firebase";

function AdminDashboard() {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const querySnapshot = await getDocs(collection(db, "cars"));
    const list = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCars(list);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "cars", id));
    fetchCars();
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <UserInfo />
        <LogoutButton />
      </div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AddCarForm onAdded={fetchCars} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            admin
            onDelete={() => handleDelete(car.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
