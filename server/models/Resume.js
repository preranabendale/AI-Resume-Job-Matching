const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    aiAnalysis: {
      atsScore: {
        type: Number,
        default: 0,
      },

      detectedSkills: {
        type: [String],
        default: [],
      },

      strengths: {
        type: [String],
        default: [],
      },

      missingSkills: {
        type: [String],
        default: [],
      },

      suggestions: {
        type: [String],
        default: [],
      },

      scoreBreakdown: {
        technicalSkills: {
          type: Number,
          default: 0,
        },

        atsCompatibility: {
          type: Number,
          default: 0,
        },

        resumeStructure: {
          type: Number,
          default: 0,
        },

        contentQuality: {
          type: Number,
          default: 0,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Resume || mongoose.model("Resume", resumeSchema);