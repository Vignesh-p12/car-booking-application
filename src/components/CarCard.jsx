// src/components/CarCard.jsx

function CarCard({ car, showBookButton = false, onBook, admin = false, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={car.imageUrl || "/default-car.jpg"}
        alt={car.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{car.name}</h2>
        <p className="text-blue-600 font-semibold mt-1">₹ {car.price}</p>
        <p className="text-sm text-gray-600 mt-1">🚗 Mileage: {car.mileage} km</p>
        <p className="text-sm text-gray-600">⛽ Fuel: {car.fuelType}</p>
        <p className="text-sm text-gray-600">📅 Year: {car.year}</p>

        {/* Book Button for Users */}
        {showBookButton && (
          <button
            onClick={onBook}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            📩 Book This Car
          </button>
        )}

        {/* Delete Button for Admins */}
        {admin && (
          <button
            onClick={onDelete}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          >
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default CarCard;
