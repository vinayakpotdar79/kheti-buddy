from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np
import os

app = FastAPI(title="Crop Recommendation API")

#request body using pydantic
class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_DIR = os.path.abspath(
    os.path.join(BASE_DIR, "..", "..", "..", "ML_models")
)
# print(MODEL_DIR)

MODEL_PATH = os.path.join(MODEL_DIR, "crop_model.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "label_encoder.pkl")


model = None
scaler = None
label_encoder = None


@app.on_event("startup")
def load_models():
    global model, scaler, label_encoder

    print("Loading ML models...")
    print("Model dir:", MODEL_DIR)

    if not os.path.exists(MODEL_PATH):
        raise RuntimeError(f"Model not found: {MODEL_PATH}")

    if not os.path.exists(SCALER_PATH):
        raise RuntimeError(f"Scaler not found: {SCALER_PATH}")

    if not os.path.exists(ENCODER_PATH):
        raise RuntimeError(f"Encoder not found: {ENCODER_PATH}")

    try:
        with open(MODEL_PATH, "rb") as f: #rb means read binary
            model = pickle.load(f)

        with open(SCALER_PATH, "rb") as f:
            scaler = pickle.load(f)

        with open(ENCODER_PATH, "rb") as f:
            label_encoder = pickle.load(f)

        print("✅ All ML models loaded successfully")

    except Exception as e:
        raise RuntimeError(f"Error loading models: {e}")


@app.post("/predict")
def predict_crop(data: CropInput):#CropInput is the structure of the request body

    if model is None or scaler is None or label_encoder is None:
        raise HTTPException(
            status_code=500,
            detail="Models not loaded properly"
        )

    try:
        features = np.array([
            [
                data.N,
                data.P,
                data.K,
                data.temperature,
                data.humidity,
                data.ph,
                data.rainfall
            ]
        ])

        scaled = scaler.transform(features) #scaling the features to the same scale 

        pred = model.predict(scaled)

        crop = label_encoder.inverse_transform(pred)[0]

        return {
            "success": True,
            "crop": crop
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@app.get("/")
def health():
    return {
        "status": "running",
        "models_loaded": model is not None
    }