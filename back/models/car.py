from pydantic import BaseModel

class CarData(BaseModel):
    year: int
    mileage: int
    brand: str
