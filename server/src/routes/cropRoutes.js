import express from "express";
const router = express.Router();
import { getPricePrediction, getRecommendation } from "../controllers/cropController.js";

router.post("/predict", getRecommendation);
router.post("/predict_price", getPricePrediction);
export default router;
