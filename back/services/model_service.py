import os
import pandas as pd
from ..models.predictions import CarPricePredictionModel  # Assuming correct import path

class CarPriceService:
    def __init__(self, csv_file: str):
        # Get the absolute path to the CSV file
        base_dir = os.path.dirname(__file__) 
        self.csv_file = os.path.join(base_dir, csv_file)  

        if not os.path.exists(self.csv_file):
            raise FileNotFoundError(f"CSV file not found at {self.csv_file}")
        
        self.df = pd.read_csv(self.csv_file) 

        # Initialize the model
        self.model = CarPricePredictionModel(self.df)  # Pass the dataframe to the CarPricePredictionModel

    def get_prediction(self, year: int, mileage: int, brand: str) -> float:
        # Now this will use the CarPricePredictionModel to make predictions
        return self.model.predict(year, mileage, brand)
