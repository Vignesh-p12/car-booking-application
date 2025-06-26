require('dotenv').config();
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// Firebase config from .env
const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID,
  measurementId: process.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Your car data
const cars = [
  {
    name: "Chevrolet Suburban 2021",
    price: 27000,
    mileage: 90,
    fuelType: "Petrol",
    year: 2021,
    imageUrl: "https://i.imgur.com/Ba7Ka1d.jpg"
  },
  {
    name: "BMW M5 2022",
    price: 32000,
    mileage: 80,
    fuelType: "Petrol",
    year: 2022,
    imageUrl: "https://i.imgur.com/bmwM5Image.jpg"
  },
  {
    name: "Audi A6",
    price: 29500,
    mileage: 70,
    fuelType: "Diesel",
    year: 2020,
    imageUrl: "https://i.imgur.com/audiA6Image.jpg"
  },
  {
    name: "Mercedes GLA",
    price: 31000,
    mileage: 65,
    fuelType: "Petrol",
    year: 2021,
    imageUrl: "https://i.imgur.com/mercGLAImage.jpg"
  },
  {
    name: "Toyota Fortuner",
    price: 35000,
    mileage: 100,
    fuelType: "Diesel",
    year: 2022,
    imageUrl: "https://i.imgur.com/toyFortuner.jpg"
  },
  {
    name: "Kia Seltos",
    price: 28000,
    mileage: 85,
    fuelType: "Petrol",
    year: 2021,
    imageUrl: "https://i.imgur.com/kiaSeltos.jpg"
  }
];

(async () => {
  const carsCollection = collection(db, "cars");
  for (const car of cars) {
    await addDoc(carsCollection, car);
    console.log(`✅ Added: ${car.name}`);
  }
})();
