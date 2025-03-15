import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import numpy as np
from ..utils.preprocessing import preprocess_data

class CarPricePredictionModel:
   #constructor method for the class , it is instanstiated when object is created 
    def __init__(self, data: pd.DataFrame):
        self.model = LinearRegression()
        self.data = data
        self.label_encoder = LabelEncoder()
        self._prepare_data()

    def _prepare_data(self):
        """ Preprocessing the data and training the model """
        X, y = preprocess_data(self.data, self.label_encoder)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)

    def predict(self, year: int, mileage: int, brand: str) -> float:
        """ Makes predictions based on the input data """
        brand_index = self.label_encoder.transform([brand])[0]
        input_data = np.array([[year, mileage, brand_index]])
        return self.model.predict(input_data)[0]
