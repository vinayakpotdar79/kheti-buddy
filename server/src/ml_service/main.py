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

class PriceInput(BaseModel):
    state: str
    district: str
    year: int
    crop: str

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_DIR = os.path.abspath(
    os.path.join(BASE_DIR, "..", "..", "..", "ML_models")
)
# print(MODEL_DIR)

MODEL_PATH = os.path.join(MODEL_DIR, "crop_model.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "label_encoder.pkl")

PRICE_MODEL_PATH = os.path.join(MODEL_DIR, "district_crop_price_model.pkl")
ENCODER_PATH_STATE = os.path.join(MODEL_DIR, "label_encoder_state.pkl")
ENCODER_PATH_DISTRICT = os.path.join(MODEL_DIR, "label_encoder_district.pkl")
ENCODER_PATH_CROP = os.path.join(MODEL_DIR, "label_encoder_crop.pkl")

model = None
scaler = None
label_encoder = None

price_model= None
le_state = None
le_dist = None
le_crop = None

@app.on_event("startup")
def load_models():
    global model, scaler, label_encoder, price_model, le_state, le_dist, le_crop

    print("Loading ML models...")
    print("Model dir:", MODEL_DIR)

    if not os.path.exists(MODEL_PATH):
        raise RuntimeError(f"Model not found: {MODEL_PATH}")

    if not os.path.exists(SCALER_PATH):
        raise RuntimeError(f"Scaler not found: {SCALER_PATH}")

    if not os.path.exists(ENCODER_PATH):
        raise RuntimeError(f"Encoder not found: {ENCODER_PATH}")

    # Check price model and encoders
    if not os.path.exists(PRICE_MODEL_PATH):
        raise RuntimeError(f"Price model not found: {PRICE_MODEL_PATH}")
    
    if not os.path.exists(ENCODER_PATH_STATE):
        raise RuntimeError(f"State encoder not found: {ENCODER_PATH_STATE}")
    if not os.path.exists(ENCODER_PATH_DISTRICT):
        raise RuntimeError(f"District encoder not found: {ENCODER_PATH_DISTRICT}")
    if not os.path.exists(ENCODER_PATH_CROP):
        raise RuntimeError(f"Crop encoder not found: {ENCODER_PATH_CROP}")

    try:
        with open(MODEL_PATH, "rb") as f: #rb means read binary
            model = pickle.load(f)

        with open(SCALER_PATH, "rb") as f:
            scaler = pickle.load(f)

        with open(ENCODER_PATH, "rb") as f:
            label_encoder = pickle.load(f)

        with open(PRICE_MODEL_PATH, "rb") as f:
            price_model = pickle.load(f)
            print(f"Price model loaded: {type(price_model)}")
        with open(ENCODER_PATH_STATE, "rb") as f:
            le_state = pickle.load(f)
            print(f"State encoder loaded: {type(le_state)}")
        with open(ENCODER_PATH_DISTRICT, "rb") as f:
            le_dist = pickle.load(f)
            print(f"District encoder loaded: {type(le_dist)}")
        with open(ENCODER_PATH_CROP, "rb") as f:
            le_crop = pickle.load(f)
            print(f"Crop encoder loaded: {type(le_crop)}")

        print("✅ All ML models loaded successfully")
        print(f"Price model is None: {price_model is None}")

    except Exception as e:
        raise RuntimeError(f"Error loading models: {e}")

# Endpoint to predict crop based on input features
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

#endpoint for predcting crop price based on input features
@app.post("/predict_price")
def predict_price(data: PriceInput):

    if price_model is None or le_state is None or le_dist is None or le_crop is None:
        raise HTTPException(
            status_code=500,
            detail="Price models not loaded properly"
        )

    try:
        features = np.array([
            [
                data.state,
                data.year,
                data.district,
                data.crop
            ]
        ])

        prediction = price_model.predict([
            [data.year,
            le_state.transform([data.state])[0],
            le_dist.transform([data.district])[0],
            le_crop.transform([data.crop])[0]]
        ])
        price = prediction[0]
        print(f"Predicted price: {price}")
        return {
            "success": True,
            "price": price
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
        "crop_models_loaded": model is not None and scaler is not None and label_encoder is not None,
        "price_models_loaded": price_model is not None and le_state is not None and le_dist is not None and le_crop is not None
    }