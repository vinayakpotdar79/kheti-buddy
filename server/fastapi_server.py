from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from src.ml_service.main import predict, load_models

app = FastAPI()

class PredictionRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

class PredictionResponse(BaseModel):
    prediction: str

# ✅ THIS IS MISSING IN YOUR CODE - ADD THIS
@app.on_event("startup")
def startup():
    load_models()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictionResponse)
def get_prediction(request: PredictionRequest):
    try:
        result = predict(request.dict())
        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
