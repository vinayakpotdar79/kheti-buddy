import axios from "axios";
import { getWeather } from "../utils/getWeather.js";
const FASTAPI_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";

export const getRecommendation = async (req, res) => {
  try {
    const { N, P, K, ph, rainfall, city } = req.body;
    if (!city) return res.status(400).json({
      success: false,
      message: "Missing required parameters. Please provide city."
    });
    const weatherData = await getWeather(city);
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
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

export const getPricePrediction = async (req, res) => {
  try {
    const { state, district, year, crop } = req.body;

    if (!state || !district || !year || !crop) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters. Please provide state, district, year, and crop."
      });
    }

    const response = await axios.post(`${FASTAPI_URL}/predict_price`, {
      state,
      district,
      year,
      crop
    });

    return res.status(200).json({
      success: true,
      predicted_price: response.data.price
    });

  } catch (error) {
    console.error("Error getting price prediction:", error.message);

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

export const getWeatherByCity = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ success: false, message: "City parameter is required" });
    }
    const weatherData = await getWeather(city);
    return res.status(200).json({
      success: true,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      feelsLike: weatherData.main.feels_like,
      description: weatherData.weather[0].main,
      windSpeed: weatherData.wind.speed,
      pressure: weatherData.main.pressure,
      cloudiness: weatherData.clouds.all,
      city: weatherData.name
    });
  } catch (error) {
    console.error("Error fetching weather for UI:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch weather for the selected city."
    });
  }
};