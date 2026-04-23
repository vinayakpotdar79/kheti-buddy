import express from "express";
const router = express.Router();
import { getPricePrediction, getRecommendation, getWeatherByCity, extractSoilReport } from "../controllers/cropController.js";

router.post("/predict", getRecommendation);
router.post("/predict_price", getPricePrediction);
router.post("/soil-report", extractSoilReport);
router.get("/getweather", getWeatherByCity);

export default router;
