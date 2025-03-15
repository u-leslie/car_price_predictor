import pandas as pd
from sklearn.preprocessing import LabelEncoder

def preprocess_data(df: pd.DataFrame, label_encoder: LabelEncoder):
    """ Preprocessing for feature extraction """
    df['Brand'] = label_encoder.fit_transform(df['Brand'])
    X = df[['Year', 'Mileage', 'Brand']]  # Features
    y = df['Price']  # Target variable
    return X, y
