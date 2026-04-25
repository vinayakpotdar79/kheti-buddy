import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Predict crop
export const predictCrop = async (data) => {
  try {
    const response = await api.post('/crops/predict', data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error connecting to prediction service');
    }
    throw new Error('Network error or server is down');
  }
};

// Predict price
export const predictPrice = async (data) => {
  try {
    const response = await api.post('/crops/predict_price', data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error connecting to prediction service');
    }
    throw new Error('Network error or server is down');
  }
};

// Fetch weather
export const fetchWeather = async (city) => {
  try {
    const response = await api.get(`/crops/getweather?city=${city}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error fetching weather');
    }
    throw new Error('Network error or weather service is down');
  }
};

// Get fertilizer recommendation
export const getFertilizerRecommendation = async (data) => {
  try {
    const response = await api.post('/fertilizer/recommend', data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Error getting recommendation');
    }
    throw new Error('Network error or server is down');
  }
};

// Extract soil report values
export const extractSoilReport = async (data) => {
  try {
    const response = await api.post('/crops/soil-report', data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error extracting soil report');
    }
    throw new Error('Network error or soil analysis service is down');
  }
};
