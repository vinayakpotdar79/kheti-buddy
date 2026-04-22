import express from "express";
const router = express.Router();
import { getPricePrediction, getRecommendation, getWeatherByCity } from "../controllers/cropController.js";

router.post("/predict", getRecommendation);
router.post("/predict_price", getPricePrediction);
router.get("/getweather", getWeatherByCity);

export default router;
