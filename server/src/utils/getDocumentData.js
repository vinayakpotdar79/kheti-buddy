import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// console.log("GEMINI_API_KEY loaded:", GEMINI_API_KEY);

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
//GEMINI_API_URL is for 
const SYSTEM_INSTRUCTION = {
  parts: [{
    text: `You are a specialist Agricultural Data Extractor. 
    Your task is to analyze soil test reports and extract numerical values for Nitrogen (N), Phosphorus (P), Potassium (K), and pH.
    
    STRICT RULES:
    1. Extract only numerical values. 
    2. Convert all N, P, K values to 'mg/kg' or 'ppm' if they are in other units (like lb/acre, multiply by 1.12).
    3. Return a single JSON object.
    4. If a value is missing or illegible, use null.
    5. Keys must be exactly: "N", "P", "K", "ph".`
  }]
};

export const analyzeSoilReportImage = async ({ imageUrl, imageBase64 }) => {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing.");

  let imageData;
  if (imageUrl) {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    imageData = Buffer.from(response.data).toString('base64');
  } else if (imageBase64) {
    imageData = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
  }

  const requestBody = {
    system_instruction: SYSTEM_INSTRUCTION, // Best practice for Gemini
    contents: [{
      parts: [
        { text: "Extract the soil values from this report image." },
        {
          inline_data: {
            mime_type: "image/jpeg", // or image/png
            data: imageData
          }
        }
      ]
    }],
    generationConfig: {
      response_mime_type: "application/json", // Forces JSON output
      temperature: 0.1, // Low temperature for higher accuracy in data extraction
    }
  };

  try {
    const response = await axios.post(GEMINI_API_URL, requestBody);

    const text = response.data.candidates[0].content.parts[0].text;
    
    // Because we used response_mime_type: "application/json", 
    // text is already a clean JSON string.
    const parsedValues = JSON.parse(text);

    return {
      N: Number(parsedValues.N) || null,
      P: Number(parsedValues.P) || null,
      K: Number(parsedValues.K) || null,
      ph: Number(parsedValues.ph) || null,
      rawResponse: text
    };
  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);
    throw new Error("Failed to parse soil report.");
  }
};