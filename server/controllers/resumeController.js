const Resume = require("../models/Resume");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const { analyzeResume } = require("../services/openRouterService");


// =====================================================
// UPLOAD + ANALYZE RESUME
// =====================================================

const uploadResume = async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume",
      });
    }

    // Check logged-in user
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    console.log("========== RESUME UPLOAD ==========");
    console.log("User ID:", req.user.id);
    console.log("File:", req.file.filename);
    console.log("===================================");


    // =================================================
    // READ PDF
    // =================================================

    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text;

    console.log("========== EXTRACTED RESUME TEXT ==========");
    console.log(resumeText);
    console.log("===========================================");


    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from resume PDF",
      });
    }


    // =================================================
    // AI ANALYSIS
    // =================================================

    const aiResponse = await analyzeResume(resumeText);

    console.log("========== RAW AI RESPONSE ==========");
    console.log(aiResponse);
    console.log("=====================================");


    // =================================================
    // CLEAN AI RESPONSE
    // =================================================

    let cleanedResponse = aiResponse.trim();

    // Remove markdown code fences if AI returns them
    cleanedResponse = cleanedResponse
      .replace(/^```json/i, "")
      .replace(/^```/i, "")
      .replace(/```$/i, "")
      .trim();


    // =================================================
    // PARSE JSON
    // =================================================

    let aiAnalysis;

    try {
      aiAnalysis = JSON.parse(cleanedResponse);
    } catch (error) {
      console.log("AI JSON Parse Error:", error);

      return res.status(500).json({
        success: false,
        message: "AI returned invalid analysis format",
      });
    }


    // =================================================
    // NORMALIZE DATA
    // =================================================

    aiAnalysis = {
      atsScore: Number(aiAnalysis.atsScore) || 0,

      detectedSkills: Array.isArray(aiAnalysis.detectedSkills)
        ? aiAnalysis.detectedSkills
        : [],

      strengths: Array.isArray(aiAnalysis.strengths)
        ? aiAnalysis.strengths
        : [],

      missingSkills: Array.isArray(aiAnalysis.missingSkills)
        ? aiAnalysis.missingSkills
        : [],

      suggestions: Array.isArray(aiAnalysis.suggestions)
        ? aiAnalysis.suggestions
        : [],

      scoreBreakdown: {
        technicalSkills:
          Number(
            aiAnalysis.scoreBreakdown?.technicalSkills
          ) || 0,

        atsCompatibility:
          Number(
            aiAnalysis.scoreBreakdown?.atsCompatibility
          ) || 0,

        resumeStructure:
          Number(
            aiAnalysis.scoreBreakdown?.resumeStructure
          ) || 0,

        contentQuality:
          Number(
            aiAnalysis.scoreBreakdown?.contentQuality
          ) || 0,
      },
    };


    // =================================================
    // SAVE RESUME
    // =================================================

    const resume = await Resume.create({
      user: req.user.id,

      fileName: req.file.filename,

      resumeText,

      aiAnalysis,
    });


    console.log("========== RESUME SAVED ==========");
    console.log("Resume ID:", resume._id);
    console.log("ATS Score:", aiAnalysis.atsScore);
    console.log("=================================");


    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,

      message: "Resume uploaded and analyzed successfully",

      resumeId: resume._id,

      resume,
    });

  } catch (error) {
    console.log("========== RESUME ERROR ==========");
    console.log(error);
    console.log("=================================");

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// =====================================================
// GET LATEST RESUME OF LOGGED-IN USER
// =====================================================

const getMyResume = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }


    const resume = await Resume.findOne({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });


    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "No resume found",
      });
    }


    return res.status(200).json({
      success: true,
      resume,
    });

  } catch (error) {
    console.log("Get Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


module.exports = {
  uploadResume,
  getMyResume,
};