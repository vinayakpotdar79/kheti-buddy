import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (city) => {
    try {
        // console.log(API_KEY)
        const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather:", error.message);
        return null;
    }
};