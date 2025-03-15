from fastapi import APIRouter
from ..models.car import CarData
from ..services.model_service import CarPriceService
from fastapi.responses import JSONResponse

router = APIRouter()

car_price_service = CarPriceService("car_prices.csv")

@router.post("/predict/")
def predict_price(car: CarData):
    try:
        predicted_price = car_price_service.get_prediction(car.year, car.mileage, car.brand)
        return {"predicted_price": predicted_price}
    except Exception as e:
        return JSONResponse(status_code=400, content={"message": str(e)})

