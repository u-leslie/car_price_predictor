import React, { useState } from "react";
import axios from "axios";

const PredictionPage: React.FC = () => {
  const [year, setYear] = useState<number | string>("");
  const [mileage, setMileage] = useState<number | string>("");
  const [brand, setBrand] = useState<string>("");
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/predict/", {
        year,
        mileage,
        brand,
      });
      setPredictedPrice(response.data.predicted_price);
      setError(null);
    } catch (error) {
      setError("Failed to fetch prediction");
      setPredictedPrice(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className="md:w-1/2 h-[50vh] md:h-screen relative">
        <img
          src="https://images.unsplash.com/photo-1513036191774-b2badb8fcb76?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Car Image"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="md:w-1/2 flex items-center justify-center bg-white px-8 py-12 shadow-lg">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Car Price Prediction
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold text-start">Year:</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold text-start">
                Mileage:
              </label>
              <input
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold text-start">
                Brand:
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition duration-300"
            >
              Predict Price
            </button>
          </form>

          {predictedPrice && (
            <h3 className="mt-4 text-lg font-semibold text-green-700 text-center">
              Predicted Price: ${predictedPrice}
            </h3>
          )}
          {error && (
            <h3 className="mt-4 text-lg font-semibold text-red-600 text-center">
              {error}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
