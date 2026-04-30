import axios from "axios";
import { getWeather } from "../utils/getWeather.js";
import { analyzeSoilReportImage } from "../utils/getDocumentData.js";
import { getGroqReasoning } from "../utils/getGroqReasoning.js";
const FASTAPI_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";

export const getRecommendation = async (req, res) => {
  try {
    const { N, P, K, ph, city } = req.body;
    if (!city) return res.status(400).json({
      success: false,
      message: "Missing required parameters. Please provide city."
    });

    const weatherData = await getWeather(city);
    if (!weatherData) {
      return res.status(502).json({
        success: false,
        message: "Unable to fetch weather data for the provided city."
      });
    }

    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const rainfall = weatherData.rainfall;

    if (N === undefined || P === undefined || K === undefined || ph === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters. Please provide N, P, K, ph, and city."
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

    // Get AI Reasoning (non-blocking)
    const reasoning = await getGroqReasoning("crop", {
      N, P, K, ph, 
      temperature, humidity, rainfall,
      recommended_crop: response.data.crop
    });

    return res.status(200).json({
      success: true,
      recommended_crop: response.data.crop,
      rainfall,
      temperature,
      humidity,
      reasoning
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

export const extractSoilReport = async (req, res) => {
  try {
    const { imageUrl, imageBase64, city } = req.body;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters. Please provide city."
      });
    }

    if (!imageUrl && !imageBase64) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters. Please provide imageUrl or imageBase64."
      });
    }

    const weatherData = await getWeather(city);
    if (!weatherData) {
      return res.status(502).json({
        success: false,
        message: "Unable to fetch weather data for the provided city."
      });
    }

    const soilValues = await analyzeSoilReportImage({ imageUrl, imageBase64 });
    const { N, P, K, ph, rawText } = soilValues;

    return res.status(200).json({
      success: true,
      N,
      P,
      K,
      ph,
      rainfall: weatherData.rainfall,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      rawText
    });
  } catch (error) {
    console.error("Error extracting soil report:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to extract soil report values.",
      details: error.message
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

    // Get AI Reasoning (non-blocking)
    const reasoning = await getGroqReasoning("price", {
      state, district, year, crop,
      predicted_price: response.data.price
    });

    return res.status(200).json({
      success: true,
      predicted_price: response.data.price,
      reasoning
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