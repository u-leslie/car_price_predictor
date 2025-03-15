import React, { useState } from "react";
import axios from "axios";
import './index.css'

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
    <div>
      <h1>Car Price Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mileage:</label>
          <input
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Brand:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <button type="submit">Predict Price</button>
      </form>

      {predictedPrice && <h3>Predicted Price: ${predictedPrice}</h3>}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
    </div>
  );
};

export default PredictionPage;
