const axios = require("axios");

const analyzeResume = async (resumeText) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b",

        messages: [
          {
            role: "system",
            content: `
You are an expert ATS Resume Analyzer.

Analyze the resume carefully.

Return ONLY valid JSON.
Do not use markdown.
Do not use code fences.
Do not add any explanation outside JSON.
All scores must be numbers between 0 and 100.
`,
          },

          {
            role: "user",
            content: `
Analyze this resume for ATS compatibility and job readiness.

Return EXACTLY this JSON structure:

{
  "atsScore": 0,
  "detectedSkills": [],
  "strengths": [],
  "missingSkills": [],
  "suggestions": [],
  "scoreBreakdown": {
    "technicalSkills": 0,
    "atsCompatibility": 0,
    "resumeStructure": 0,
    "contentQuality": 0
  }
}

Rules:

1. atsScore:
Give an overall ATS score from 0 to 100.

2. detectedSkills:
Extract actual technical skills mentioned in the resume.
Examples:
HTML, CSS, JavaScript, React.js, Node.js, MongoDB, Express.js, Git.

Do NOT invent skills that are not present.

3. strengths:
Give 3 to 5 strong points based only on the resume.

4. missingSkills:
Suggest useful skills that are missing based on the candidate's current technical profile.
Do not list skills that are already present.

5. suggestions:
Give 3 to 5 practical resume improvement suggestions.

6. scoreBreakdown:
Give realistic scores for:
- technicalSkills
- atsCompatibility
- resumeStructure
- contentQuality

The four scores should reflect the actual resume.

Resume:

${resumeText}
`,
          },
        ],
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "AI Resume Job Matching",
        },
      }
    );

    const aiContent =
      response.data?.choices?.[0]?.message?.content;

    if (!aiContent) {
      throw new Error("Empty AI response");
    }

    console.log("========== AI RESPONSE ==========");
    console.log(aiContent);
    console.log("=================================");

    return aiContent;
  } catch (error) {
    console.log("========== OPENROUTER ERROR ==========");
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    console.log("======================================");

    throw error;
  }
};

module.exports = {
  analyzeResume,
};