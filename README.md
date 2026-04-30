# KhetiBuddy-Crop Recommendation and Price Prediction Platform

A full-stack agriculture assistant that combines crop recommendation, fertilizer advice, soil-report extraction, weather integration, price prediction, and conversational AI.

## Key Features

- Crop recommendation using soil NPK, pH, and local weather
- Crop price prediction by state, district, year, and crop
- Soil report image extraction via AI-powered document analysis
- Fertilizer recommendation using NPK and crop details
- Weather lookup for city-based conditions
- Chatbot assistant for farmer guidance and advice
- ML learning-centric system with model training and prediction workflows

## Machine Learning Approach

- Crop recommendation uses a supervised classification model trained with soil and weather features. The deployed model is based on Gaussian Naive Bayes, selected for its strong performance on the crop recommendation dataset.
- Price prediction uses a supervised regression model trained on state, district, year, and crop data. The deployed model is a Random Forest Regressor, chosen for its ability to model nonlinear price relationships and handle categorical encodings.
- Both crop and price predictions include AI-generated reasoning, giving users an explanation of why a recommendation or price estimate was made.
## Feature Explanation

### Crop recommendation features
- `N`, `P`, `K`: Soil macronutrients required by crops. These values help determine nutrient suitability for each crop.
- `ph`: Soil pH, which influences nutrient availability and crop choice.
- `temperature`: Ambient temperature from weather data; crops have preferred temperature ranges.
- `humidity`: Air humidity, which impacts crop water stress and disease risk.
- `rainfall`: Recent precipitation level, important for irrigation and crop selection.

### Price prediction features
- `state`: Region-level context for price patterns and market behavior.
- `district`: Local district information that captures regional supply and demand differences.
- `year`: Temporal context to account for changing market conditions over time.
- `crop`: Crop identity, which directly affects expected market price.

## Project Structure

- `client/` — React + Vite frontend
- `server/` — Express backend with API routes and integrations
- `server/src/ml_service/` — FastAPI service serving ML models
- `ML_models/` — Serialized machine learning artifacts used by the FastAPI service
- `model_training/` — datasets and notebooks used for model training and experimentation

## Architecture

- Frontend: React with Vite, Tailwind CSS, React Router
- Backend: Node.js + Express API routes
- ML Service: FastAPI with serialized `pickle` models
- External APIs:
  - OpenWeatherMap for weather
  - Groq / Gemini for AI reasoning and soil document extraction

## Setup

### 1. Install backend dependencies

```bash
cd server
npm install
```

### 2. Install frontend dependencies

```bash
cd ../client
npm install
```

### 3. Install ML service dependencies

```bash
cd ../server/src/ml_service
python -m pip install -r requirements.txt
```

## Running the Project

### 1. Start the ML service

From `server/src/ml_service`:

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### 2. Start the backend server

From `server`:

```bash
node server.js
```

### 3. Start the frontend

From `client`:

```bash
npm run dev
```

Then open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## ML Models

The FastAPI service loads models from `ML_models/`:

- `crop_model.pkl`
- `scaler.pkl`
- `label_encoder.pkl`
- `district_crop_price_model.pkl`
- `label_encoder_state.pkl`
- `label_encoder_district.pkl`
- `label_encoder_crop.pkl`

---

## Objective

KhetiBuddy aims to enhance agricultural productivity and profitability by providing intelligent, accessible, and explainable recommendations powered by machine learning and AI.
