import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(db, "cars", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setCar({ id, ...docSnap.data() });
    };
    fetch();
  }, [id]);

  if (!car) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{car.brand} {car.model}</h2>
      <img src={car.imageUrl} alt={car.model} className="w-80 h-auto mb-4" />
      <p>Year: {car.year}</p>
      <p>Price: ₹{car.price}</p>
      <p>Owner: {car.ownerEmail}</p>
    </div>
  );
}

export default CarDetail;
