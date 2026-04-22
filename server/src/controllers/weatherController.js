import { getWeather } from "../utils/getWeather.js";

export const getWeatherController = async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters. Please provide city."
            });
        }
        const weather = await getWeather(city);
        return res.status(200).json({
            success: true,
            weather
        });
    } catch (error) {
        console.error("Error getting weather:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Ensure the FastAPI ML service is running."
        });
    }
};