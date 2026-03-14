import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cropRoutes from "./src/routes/cropRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/crops", cropRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
