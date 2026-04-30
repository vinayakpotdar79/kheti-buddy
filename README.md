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

If any model file is missing, the ML service will fail to start.
Objective

# KhetiBuddy — Crop Recommendation & Price Prediction Platform

KhetiBuddy is a full-stack agricultural assistant designed to support farmers with data-driven decision-making. It integrates machine learning, weather data, document analysis, and conversational AI to provide actionable insights for crop selection, pricing, and farm management.

---

## Key Features

* **Crop Recommendation** based on soil nutrients (NPK), pH, and real-time weather data
* **Crop Price Prediction** using region-specific and temporal market data
* **Soil Report Extraction** from images using AI-powered document analysis
* **Fertilizer Recommendation** tailored to soil composition and selected crop
* **Weather Integration** for city-based environmental conditions
* **Conversational AI Assistant** for guidance and query resolution
* **End-to-End ML Pipeline** including training, evaluation, and deployment

---

## Machine Learning Approach

### Crop Recommendation

* Supervised classification model trained on soil and weather features
* Uses **Gaussian Naive Bayes**, chosen for its simplicity and strong performance on structured agricultural datasets

### Price Prediction

* Supervised regression model trained on regional and temporal data
* Uses **Random Forest Regressor**, selected for its ability to capture nonlinear relationships and handle encoded categorical features

### Explainability

* Both models provide **AI-generated explanations**, helping users understand the reasoning behind predictions

---

## Feature Details

### Crop Recommendation Inputs

* `N`, `P`, `K`: Soil macronutrient levels
* `ph`: Soil acidity/alkalinity affecting nutrient absorption
* `temperature`: Environmental temperature
* `humidity`: Atmospheric moisture level
* `rainfall`: Precipitation data influencing irrigation needs

### Price Prediction Inputs

* `state`: Regional pricing trends
* `district`: Local market variations
* `year`: Temporal trends in pricing
* `crop`: Crop type

---

## Project Structure

```
client/                     # React + Vite frontend
server/                     # Node.js + Express backend
server/src/ml_service/      # FastAPI ML service
ML_models/                  # Serialized ML models
model_training/             # Datasets and training notebooks
```

---

## System Architecture

* **Frontend:** React (Vite) with Tailwind CSS and React Router
* **Backend:** Node.js with Express
* **ML Service:** FastAPI serving `pickle`-serialized models
* **External Integrations:**

  * Weather API for real-time data
  * LLM APIs (Groq / Gemini) for reasoning and document parsing

---

## Setup Instructions

### 1. Backend Setup

```bash
cd server
npm install
```

### 2. Frontend Setup

```bash
cd client
npm install
```

### 3. ML Service Setup

```bash
cd server/src/ml_service
python -m pip install -r requirements.txt
```

---

## Running the Application

### Start ML Service

```bash
cd server/src/ml_service
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Start Backend

```bash
cd server
node server.js
```

### Start Frontend

```bash
cd client
npm run dev
```

Access the app at:
`http://localhost:5173`

---

## Machine Learning Models

The ML service loads the following models from `ML_models/`:

* `crop_model.pkl`
* `scaler.pkl`
* `label_encoder.pkl`
* `district_crop_price_model.pkl`
* `label_encoder_state.pkl`
* `label_encoder_district.pkl`
* `label_encoder_crop.pkl`

> Ensure all model files are present. Missing files will prevent the ML service from starting.

---

## Objective

KhetiBuddy aims to enhance agricultural productivity and profitability by providing intelligent, accessible, and explainable recommendations powered by machine learning and AI.
