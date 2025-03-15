from fastapi import FastAPI
from .endpoint import car_price

app = FastAPI()

# Include the car prediction endpoint
app.include_router(car_price.router)

