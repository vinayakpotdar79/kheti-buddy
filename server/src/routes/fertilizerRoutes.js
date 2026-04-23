import express from "express";
import { getFertilizerRecommendation } from "../controllers/fertilizerController.js";

const router = express.Router();

router.post("/recommend", getFertilizerRecommendation);

export default router;