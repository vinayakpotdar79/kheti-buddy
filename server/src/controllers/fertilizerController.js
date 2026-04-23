import fetch from "node-fetch";

export const getFertilizerRecommendation = async (req, res) => {
  const { nitrogen, phosphorus, potassium, crop } = req.body;

  if (!nitrogen || !phosphorus || !potassium || !crop) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROK_API_KEY not configured" });
  }

  const prompt = `I want to grow ${crop}. My soil NPK values are:
- Nitrogen (N): ${nitrogen} ppm
- Phosphorus (P): ${phosphorus} ppm  
- Potassium (K): ${potassium} ppm

Give a SHORT fertilizer recommendation with ONLY these 4 sections.

IMPORTANT FORMATTING RULES:
- Each section MUST be on a NEW LINE
- Use plain text (no markdown like ** or *)
- Follow EXACT format below

FORMAT:
1. Assessment: <text>
2. Recommended Fertilizers: <text>
3. Application Schedule: <text>
4. Warnings: <text>

Be concise. Indian farmers context. No extra text.`;

  try {
    const grokRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are an agricultural expert specializing in fertilizer recommendations for Indian farmers.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!grokRes.ok) {
      const err = await grokRes.text();
      return res.status(grokRes.status).json({ error: `Grok API error: ${err}` });
    }

    const data = await grokRes.json();
    const recommendation = data.choices[0].message.content;

    res.json({
      success: true,
      npk: { nitrogen, phosphorus, potassium },
      crop,
      recommendation,
    });
  } catch (err) {
    console.error("Fertilizer controller error:", err);
    res.status(500).json({ error: err.message });
  }
};