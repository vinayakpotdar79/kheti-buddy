import axios from "axios";
const FASTAPI_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";

export const getRecommendation = async (req, res) => {
  try {
    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

    if (
      N === undefined || P === undefined || K === undefined ||
      temperature === undefined || humidity === undefined ||
      ph === undefined || rainfall === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters. Please provide N, P, K, temperature, humidity, ph, and rainfall."
      });
    }

    const response = await axios.post(`${FASTAPI_URL}/predict`, {
      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      rainfall
    });
    console.log(response.data);
    return res.status(200).json({
      success: true,
      recommended_crop: response.data.crop
    });

  } catch (error) {
    console.error("Error getting recommendation:", error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: "Error from Machine Learning service",
        details: error.response.data
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error. Ensure the FastAPI ML service is running."
    });
  }
};
