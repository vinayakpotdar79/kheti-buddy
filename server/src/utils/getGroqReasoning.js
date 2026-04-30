import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

export const getGroqReasoning = async (type, data) => {
  try {
    let systemPrompt = "";
    let userPrompt = "";
    
    if (type === "crop") {
      const { N, P, K, ph, temperature, humidity, rainfall, recommended_crop } = data;
      systemPrompt = `You are an expert agronomist and soil scientist AI assistant for Indian farmers. 
Your role is to explain crop recommendations in clear, friendly, and practical language that farmers can understand.
Keep your response concise (3-4 short paragraphs), structured, and use simple language.
Format your response with these sections:
🌱 Why This Crop?
🧪 Soil Analysis
🌤️ Climate Match
💡 Farming Tip`;

      userPrompt = `Our ML model recommended "${recommended_crop}" for a farmer based on these soil and weather conditions:

Soil Nutrients:
- Nitrogen (N): ${N} kg/ha
- Phosphorous (P): ${P} kg/ha  
- Potassium (K): ${K} kg/ha
- pH Level: ${ph}

Current Weather:
- Temperature: ${temperature}°C
- Humidity: ${humidity}%
- Rainfall: ${rainfall} mm

Please explain WHY "${recommended_crop}" is the best choice for these specific conditions in 3-4 short paragraphs. Be specific about how each soil nutrient and weather factor contributes to this recommendation.`;

    } else if (type === "price") {
      const { state, district, crop, year, predicted_price } = data;
      systemPrompt = `You are an expert agricultural economist and market analyst AI assistant for Indian farmers.
Your role is to explain crop price predictions in clear, practical language that farmers and traders can understand.
Keep your response concise (3-4 short paragraphs), structured, and insightful.
Format your response with these sections:
📊 Price Outlook
📍 Regional Factors
📅 Year ${year} Trends
💡 Market Tip`;

      userPrompt = `Our ML model predicted a price of ₹${parseFloat(predicted_price).toFixed(2)} per quintal for "${crop}" in ${district}, ${state} for the year ${year}.

Please explain WHY this price is expected — considering:
- Regional agricultural patterns in ${district}, ${state}
- Typical supply and demand for ${crop}
- General market trends for ${year}
- Any factors that could influence this price

Be practical and helpful for a farmer deciding whether to grow this crop.`;
    }

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    return completion.choices[0]?.message?.content || null;

  } catch (error) {
    console.error("Groq reasoning error:", error.message);
    return null;
  }
};
