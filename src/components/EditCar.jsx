// src/components/EditCar.jsx
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../services/firebase";

function EditCar({ car, onClose, onUpdate }) {
  const [form, setForm] = useState({
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "cars", car.id);
    await updateDoc(docRef, {
      ...form,
      year: Number(form.year),
      price: Number(form.price),
    });
    onUpdate(); // refresh list
    onClose();  // close modal
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Edit Car</h3>
      {["brand", "model", "year", "price"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          className="block mb-2 p-2 w-full rounded border"
        />
      ))}
      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1 bg-gray-400 rounded text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 rounded text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default EditCar;
