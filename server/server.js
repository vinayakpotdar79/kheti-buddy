import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cropRoutes from "./src/routes/cropRoutes.js";
import fertilizerRoutes from "./src/routes/fertilizerRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies with increased limit for images

// Routes
app.use("/api/crops", cropRoutes);
app.use("/api/fertilizer", fertilizerRoutes); 

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
