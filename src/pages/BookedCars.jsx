import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";

function BookedCars() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, "requests"));
      const data = snapshot.docs.map(doc => doc.data());
      setRequests(data);
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Booked Cars</h2>
      {requests.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-3">
          {requests.map((req, index) => (
            <li key={index} className="bg-white p-4 rounded shadow">
              <p><strong>Car:</strong> {req.carName}</p>
              <p><strong>User:</strong> {req.userEmail}</p>
              <p><strong>Time:</strong> {new Date(req.requestedAt?.seconds * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookedCars;
