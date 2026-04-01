import axios from 'axios';

const API_URL = 'http://localhost:5000/api/crops';

export const getCropRecommendation = async (data) => {
  const response = await axios.post(`${API_URL}/predict`, data);
  return response.data;
};

export const getPricePrediction = async (data) => {
  const response = await axios.post(`${API_URL}/predict_price`, data);
  return response.data;
};
