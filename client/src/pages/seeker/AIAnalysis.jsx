import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaRobot,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaArrowRight,
  FaFileAlt,
  FaCode,
  FaBriefcase,
} from "react-icons/fa";

import API from "../../services/api";


function AIAnalysis() {

  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =====================================================
  // FETCH LATEST RESUME ANALYSIS
  // =====================================================

  useEffect(() => {

    const fetchAnalysis = async () => {

      try {

        setLoading(true);

        setError("");


        const response = await API.get(
          "/resume/latest"
        );


        if (
          response.data?.success &&
          response.data?.resume
        ) {

          const aiAnalysis =
            response.data.resume.aiAnalysis;


          setAnalysis(aiAnalysis);


          // Save latest analysis locally too
          localStorage.setItem(
            "resumeAnalysis",
            JSON.stringify(aiAnalysis)
          );

          localStorage.setItem(
            "resumeId",
            response.data.resume._id
          );

        } else {

          setError(
            "No resume analysis found."
          );

        }

      } catch (err) {

        console.log(
          "AI Analysis Error:",
          err
        );


        // Try localStorage as fallback
        const savedAnalysis =
          localStorage.getItem(
            "resumeAnalysis"
          );


        if (savedAnalysis) {

          try {

            setAnalysis(
              JSON.parse(savedAnalysis)
            );

          } catch {

            setError(
              "Invalid saved analysis."
            );

          }

        } else {

          setError(
            err.response?.data?.message ||
              "No Resume Analysis Found"
          );

        }

      } finally {

        setLoading(false);

      }

    };


    fetchAnalysis();

  }, []);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-5 text-slate-600 font-medium">
            AI is analyzing your resume...
          </p>

        </div>

      </div>
    );

  }


  // =====================================================
  // NO ANALYSIS
  // =====================================================

  if (!analysis) {

    return (
      <div className="min-h-screen bg-slate-50">

        <div className="max-w-3xl mx-auto px-6 py-24">

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 text-center">

            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">

              <FaFileAlt />

            </div>


            <h1 className="text-3xl font-bold text-slate-900 mt-6">

              No Resume Analysis Found

            </h1>


            <p className="text-slate-500 mt-3">

              Please upload your resume first to get
              your AI-powered resume analysis.

            </p>


            {error && (

              <p className="text-red-500 text-sm mt-4">
                {error}
              </p>

            )}


            <Link
              to="/seeker/resume"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold mt-7 transition"
            >

              <FaFileAlt />

              Upload Resume

              <FaArrowRight />

            </Link>

          </div>

        </div>

      </div>
    );

  }


  // =====================================================
  // DATA
  // =====================================================

  const atsScore =
    Number(analysis.atsScore) || 0;


  const skills =
    Array.isArray(analysis.detectedSkills)
      ? analysis.detectedSkills
      : [];


  const strengths =
    Array.isArray(analysis.strengths)
      ? analysis.strengths
      : [];


  const missingSkills =
    Array.isArray(analysis.missingSkills)
      ? analysis.missingSkills
      : [];


  const suggestions =
    Array.isArray(analysis.suggestions)
      ? analysis.suggestions
      : [];


  const breakdown =
    analysis.scoreBreakdown || {};


  const technicalSkills =
    Number(breakdown.technicalSkills) || 0;


  const atsCompatibility =
    Number(breakdown.atsCompatibility) || 0;


  const resumeStructure =
    Number(breakdown.resumeStructure) || 0;


  const contentQuality =
    Number(breakdown.contentQuality) || 0;


  // =====================================================
  // SCORE MESSAGE
  // =====================================================

  let scoreMessage = "Needs Improvement";

  let scoreColor = "text-orange-500";

  if (atsScore >= 80) {

    scoreMessage = "Excellent Resume";

    scoreColor = "text-green-600";

  } else if (atsScore >= 60) {

    scoreMessage = "Good Resume";

    scoreColor = "text-blue-600";

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="min-h-screen bg-slate-50">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <section className="bg-white border-b border-slate-100">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold">

                <FaRobot />

                AI Resume Analysis

              </div>


              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-5">

                Resume

                <span className="text-blue-600">
                  {" "}Analysis
                </span>

              </h1>


              <p className="text-slate-500 mt-4 text-lg">

                Understand your resume performance and
                discover areas where you can improve.

              </p>

            </div>


            <Link
              to="/seeker/resume"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >

              <FaFileAlt />

              Upload New Resume

            </Link>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="max-w-7xl mx-auto px-6 py-12">


        {/* ================================================= */}
        {/* TOP CARDS */}
        {/* ================================================= */}

        <div className="grid lg:grid-cols-3 gap-6">


          {/* ATS SCORE */}

          <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Overall ATS Score
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  Resume Score
                </h2>

              </div>


              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

                <FaChartLine />

              </div>

            </div>


            <div className="flex justify-center my-8">

              <div className="w-44 h-44 rounded-full border-[14px] border-blue-100 flex items-center justify-center">

                <div className="text-center">

                  <p className="text-5xl font-extrabold text-blue-600">

                    {atsScore}

                  </p>

                  <p className="text-sm text-slate-500">
                    out of 100
                  </p>

                </div>

              </div>

            </div>


            <div
              className={`flex items-center justify-center gap-2 font-semibold ${scoreColor}`}
            >

              <FaCheckCircle />

              {scoreMessage}

            </div>


            <p className="text-center text-sm text-slate-500 mt-2">

              Your score is calculated from your
              resume content and ATS compatibility.

            </p>

          </div>


          {/* DETECTED SKILLS */}

          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

                <FaCode />

              </div>


              <div>

                <h2 className="text-2xl font-bold text-slate-900">

                  Detected Skills

                </h2>

                <p className="text-sm text-slate-500">

                  Skills detected from your resume

                </p>

              </div>

            </div>


            <div className="flex flex-wrap gap-3 mt-7">

              {skills.length > 0 ? (

                skills.map((skill, index) => (

                  <span
                    key={index}
                    className="px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm"
                  >

                    {skill}

                  </span>

                ))

              ) : (

                <p className="text-slate-500">
                  No technical skills detected.
                </p>

              )}

            </div>


            {/* STRENGTHS */}

            {strengths.length > 0 && (

              <div className="mt-8">

                <h3 className="font-bold text-slate-900 mb-4">

                  Strong Points

                </h3>


                <div className="space-y-3">

                  {strengths.map(
                    (strength, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >

                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />

                        <p className="text-slate-600">
                          {strength}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

          </div>

        </div>


        {/* ================================================= */}
        {/* MISSING SKILLS + SUGGESTIONS */}
        {/* ================================================= */}

        <div className="grid lg:grid-cols-2 gap-6 mt-8">


          {/* MISSING SKILLS */}

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">

                <FaExclamationTriangle />

              </div>


              <div>

                <h2 className="text-2xl font-bold text-slate-900">

                  Missing Skills

                </h2>

                <p className="text-sm text-slate-500">

                  Skills that may improve your profile

                </p>

              </div>

            </div>


            <div className="space-y-3 mt-7">

              {missingSkills.length > 0 ? (

                missingSkills.map(
                  (skill, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between bg-orange-50 border border-orange-100 rounded-xl px-4 py-3"
                    >

                      <span className="font-medium text-slate-700">

                        {skill}

                      </span>


                      <span className="text-xs font-semibold text-orange-600">

                        Recommended

                      </span>

                    </div>

                  )
                )

              ) : (

                <p className="text-green-600 font-medium">

                  Great! No major missing skills detected.

                </p>

              )}

            </div>

          </div>


          {/* SUGGESTIONS */}

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center">

                <FaLightbulb />

              </div>


              <div>

                <h2 className="text-2xl font-bold text-slate-900">

                  AI Suggestions

                </h2>

                <p className="text-sm text-slate-500">

                  Personalized resume improvement tips

                </p>

              </div>

            </div>


            <div className="space-y-4 mt-7">

              {suggestions.length > 0 ? (

                suggestions.map(
                  (suggestion, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >

                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">

                        {index + 1}

                      </div>


                      <p className="text-slate-600 leading-6">

                        {suggestion}

                      </p>

                    </div>

                  )
                )

              ) : (

                <p className="text-slate-500">
                  No suggestions available.
                </p>

              )}

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* SCORE BREAKDOWN */}
        {/* ================================================= */}

        <section className="mt-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

          <div className="flex items-center gap-3 mb-8">

            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

              <FaChartLine />

            </div>


            <div>

              <h2 className="text-2xl font-bold text-slate-900">

                Score Breakdown

              </h2>

              <p className="text-sm text-slate-500">

                Detailed resume performance

              </p>

            </div>

          </div>


          <div className="grid md:grid-cols-2 gap-7">

            <ScoreBar
              title="Technical Skills"
              score={technicalSkills}
            />

            <ScoreBar
              title="ATS Compatibility"
              score={atsCompatibility}
            />

            <ScoreBar
              title="Resume Structure"
              score={resumeStructure}
            />

            <ScoreBar
              title="Content Quality"
              score={contentQuality}
            />

          </div>

        </section>


        {/* ================================================= */}
        {/* JOB MATCHING */}
        {/* ================================================= */}

        <section className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-10 text-white">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">

            <div>

              <div className="flex items-center gap-2 text-blue-100 font-semibold">

                <FaBriefcase />

                AI Job Matching

              </div>


              <h2 className="text-3xl font-bold mt-3">

                Find Jobs That Match Your Skills

              </h2>


              <p className="text-blue-100 mt-3 max-w-2xl leading-7">

                Discover job opportunities based on your
                skills, resume and career profile.

              </p>

            </div>


            <Link
              to="/seeker/jobs"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition"
            >

              Explore Jobs

              <FaArrowRight />

            </Link>

          </div>

        </section>

      </main>

    </div>

  );
}


// =====================================================
// SCORE BAR
// =====================================================

function ScoreBar({ title, score }) {

  return (

    <div>

      <div className="flex justify-between items-center mb-2">

        <span className="font-medium text-slate-700">

          {title}

        </span>


        <span className="font-bold text-blue-600">

          {score}%

        </span>

      </div>


      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">

        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-700"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>

  );
}


export default AIAnalysis;