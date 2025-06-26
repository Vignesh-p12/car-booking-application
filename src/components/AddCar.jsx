import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../services/firebase";

function AddCar() {
  const [form, setForm] = useState({ brand: "", model: "", year: "", price: "", ownerEmail: "" });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");

    const imgRef = ref(storage, `cars/${uuidv4()}`);
    await uploadBytes(imgRef, image);
    const imageUrl = await getDownloadURL(imgRef);

    await addDoc(collection(db, "cars"), { ...form, imageUrl });
    alert("Car added!");
    setForm({ brand: "", model: "", year: "", price: "", ownerEmail: "" });
    setImage(null);
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add a New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="w-full border p-2 rounded"
          />
        ))}
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full" />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Add Car</button>
      </form>
    </div>
  );
}

export default AddCar;