import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../services/firebase";

function AddCarForm() {
  const [car, setCar] = useState({ name: "", price: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  // ✅ Allow any signed-in user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthorized(true);
      } else {
        navigate("/"); // Redirect to login
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!car.name || !car.price || !car.description || !imageFile) {
      setMessage("❗ All fields including image are required.");
      return;
    }

    try {
      const imageRef = ref(storage, `cars/${Date.now()}-${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "cars"), {
        ...car,
        price: parseFloat(car.price),
        image: imageUrl,
        createdAt: new Date(),
      });

      setMessage("✅ Car added successfully!");
      setCar({ name: "", price: "", description: "" });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding car:", error);
      setMessage("❌ Failed to add car.");
    }
  };

  // ❌ Don't render until authorization is checked
  if (!authorized) return null;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Car</h2>

      {message && (
        <div
          className={`text-sm mb-4 p-2 rounded ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={car.name}
          onChange={handleChange}
          placeholder="Car Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={car.price}
          onChange={handleChange}
          placeholder="Price in ₹"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={car.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows="3"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
          required
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-40 object-cover rounded border mt-2"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Car
        </button>
      </form>
    </div>
  );
}

export default AddCarForm;
