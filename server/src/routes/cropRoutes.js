import express from "express";
const router = express.Router();
import { getRecommendation } from "../controllers/cropController.js";

router.post("/predict", getRecommendation);

export default router;
