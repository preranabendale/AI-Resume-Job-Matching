import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowRight,
  FaRobot,
  FaTrash,
} from "react-icons/fa";

import API from "../../services/api";


function Resume() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");


  // =====================================================
  // FILE SELECT
  // =====================================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    setMessage("");
    setError("");
    setUploadProgress(0);


    if (!file) {
      return;
    }


    // Check PDF
    if (file.type !== "application/pdf") {
      setError("Please select a PDF file only.");

      setSelectedFile(null);

      return;
    }


    // Check file size - 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Resume size must be less than 5 MB.");

      setSelectedFile(null);

      return;
    }


    setSelectedFile(file);
  };


  // =====================================================
  // SELECT FILE BUTTON
  // =====================================================

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };


  // =====================================================
  // REMOVE FILE
  // =====================================================

  const handleRemoveFile = () => {
    setSelectedFile(null);

    setMessage("");

    setError("");

    setUploadProgress(0);


    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  // =====================================================
  // UPLOAD RESUME
  // =====================================================

  const handleUpload = async () => {

    if (!selectedFile) {
      setError("Please select a PDF resume first.");
      return;
    }


    setUploading(true);

    setUploadProgress(0);

    setMessage("");

    setError("");


    try {

      // Create FormData
      const formData = new FormData();

      formData.append("resume", selectedFile);


      // API request
      const response = await API.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (progressEvent) => {

            if (progressEvent.total) {

              const percent = Math.round(
                (progressEvent.loaded * 100) /
                  progressEvent.total
              );

              setUploadProgress(percent);
            }
          },
        }
      );


      console.log(
        "Resume Upload Response:",
        response.data
      );


      // =================================================
      // SAVE AI ANALYSIS
      // =================================================

      if (response.data?.resume) {

        const resume =
          response.data.resume;


        const aiAnalysis =
          resume.aiAnalysis;


        // Save complete analysis
        if (aiAnalysis) {

          localStorage.setItem(
            "resumeAnalysis",
            JSON.stringify(aiAnalysis)
          );

        }


        // Save resume ID
        if (resume._id) {

          localStorage.setItem(
            "resumeId",
            resume._id
          );

        }


        // Save resume file name
        if (resume.fileName) {

          localStorage.setItem(
            "resumeFileName",
            resume.fileName
          );

        }

      }


      // =================================================
      // ALSO HANDLE DIRECT AI ANALYSIS RESPONSE
      // =================================================

      if (response.data?.analysis) {

        localStorage.setItem(
          "resumeAnalysis",
          JSON.stringify(
            response.data.analysis
          )
        );

      }


      // =================================================
      // SUCCESS
      // =================================================

      setUploadProgress(100);

      setMessage(
        response.data?.message ||
          "Resume uploaded and analyzed successfully!"
      );


    } catch (err) {

      console.log(
        "Resume Upload Error:",
        err
      );


      console.log(
        "Server Response:",
        err.response?.data
      );


      setError(
        err.response?.data?.message ||
          "Resume upload failed. Please try again."
      );


      setUploadProgress(0);

    } finally {

      setUploading(false);

    }
  };


  // =====================================================
  // FORMAT FILE SIZE
  // =====================================================

  const formatFileSize = (bytes) => {

    if (!bytes) {
      return "0 KB";
    }


    const kb = bytes / 1024;


    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }


    const mb = kb / 1024;

    return `${mb.toFixed(2)} MB`;
  };


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

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold">

              <FaRobot />

              AI Resume Analyzer

            </div>


            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-5">

              Upload Your

              <span className="text-blue-600">
                {" "}Resume
              </span>

            </h1>


            <p className="text-lg text-slate-500 mt-4 leading-8">

              Upload your resume and let our AI analyze
              your ATS score, skills, strengths and
              improvement areas.

            </p>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="max-w-5xl mx-auto px-6 py-12">


        {/* ================================================= */}
        {/* UPLOAD CARD */}
        {/* ================================================= */}

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">


          {/* TITLE */}

          <div className="text-center">

            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto text-3xl">

              <FaCloudUploadAlt />

            </div>


            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-5">

              Upload Your Resume

            </h2>


            <p className="text-slate-500 mt-2">

              PDF format only • Maximum size 5 MB

            </p>

          </div>


          {/* ================================================= */}
          {/* FILE INPUT */}
          {/* ================================================= */}

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />


          {/* ================================================= */}
          {/* DROP / SELECT AREA */}
          {/* ================================================= */}

          {!selectedFile ? (

            <button
              type="button"
              onClick={handleChooseFile}
              className="w-full mt-8 border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-12 transition cursor-pointer"
            >

              <FaCloudUploadAlt className="text-5xl text-blue-500 mx-auto" />


              <p className="text-lg font-semibold text-slate-800 mt-5">

                Click to choose your resume

              </p>


              <p className="text-sm text-slate-500 mt-2">

                Upload your PDF resume here

              </p>


              <span className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">

                Choose PDF

              </span>

            </button>

          ) : (

            /* ================================================= */
            /* SELECTED FILE */
            /* ================================================= */

            <div className="mt-8 border border-blue-100 bg-blue-50/50 rounded-2xl p-5">

              <div className="flex items-center gap-4">


                {/* PDF ICON */}

                <div className="w-14 h-14 rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-2xl flex-shrink-0">

                  <FaFilePdf />

                </div>


                {/* FILE INFO */}

                <div className="flex-1 min-w-0">

                  <p className="font-semibold text-slate-900 truncate">

                    {selectedFile.name}

                  </p>


                  <p className="text-sm text-slate-500 mt-1">

                    {formatFileSize(
                      selectedFile.size
                    )}

                  </p>

                </div>


                {/* REMOVE */}

                {!uploading && (

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-200 flex items-center justify-center transition"
                    title="Remove file"
                  >

                    <FaTrash />

                  </button>

                )}

              </div>


              {/* ================================================= */}
              {/* PROGRESS */}
              {/* ================================================= */}

              {uploading && (

                <div className="mt-6">

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-slate-600 font-medium">

                      Uploading and analyzing...

                    </span>


                    <span className="font-semibold text-blue-600">

                      {uploadProgress}%

                    </span>

                  </div>


                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{
                        width: `${uploadProgress}%`,
                      }}
                    />

                  </div>

                </div>

              )}

            </div>

          )}


          {/* ================================================= */}
          {/* ERROR MESSAGE */}
          {/* ================================================= */}

          {error && (

            <div className="mt-5 flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 rounded-xl p-4">

              <FaExclamationCircle className="mt-1 flex-shrink-0" />

              <p className="text-sm font-medium">

                {error}

              </p>

            </div>

          )}


          {/* ================================================= */}
          {/* SUCCESS MESSAGE */}
          {/* ================================================= */}

          {message && (

            <div className="mt-5 flex items-start gap-3 bg-green-50 border border-green-100 text-green-600 rounded-xl p-4">

              <FaCheckCircle className="mt-1 flex-shrink-0" />

              <p className="text-sm font-medium">

                {message}

              </p>

            </div>

          )}


          {/* ================================================= */}
          {/* UPLOAD BUTTON */}
          {/* ================================================= */}

          {selectedFile && (

            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className={`w-full mt-7 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition ${
                uploading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >

              {uploading ? (

                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                  Analyzing Resume...

                </>

              ) : (

                <>
                  <FaRobot />

                  Upload & Analyze Resume

                  <FaArrowRight />

                </>

              )}

            </button>

          )}


          {/* ================================================= */}
          {/* ANALYSIS LINK */}
          {/* ================================================= */}

          {message && (

            <div className="text-center mt-6">

              <Link
                to="/seeker/ai-analysis"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >

                View AI Resume Analysis

                <FaArrowRight />

              </Link>

            </div>

          )}

        </div>


        {/* ================================================= */}
        {/* HOW IT WORKS */}
        {/* ================================================= */}

        <section className="mt-10">

          <h2 className="text-2xl font-bold text-slate-900 text-center">

            How It Works

          </h2>


          <p className="text-center text-slate-500 mt-2">

            Get useful resume insights in three simple steps.

          </p>


          <div className="grid md:grid-cols-3 gap-5 mt-7">


            {/* STEP 1 */}

            <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm">

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">

                1

              </div>


              <h3 className="font-bold text-slate-900 mt-4">

                Upload Resume

              </h3>


              <p className="text-sm text-slate-500 mt-2 leading-6">

                Upload your resume in PDF format.

              </p>

            </div>


            {/* STEP 2 */}

            <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm">

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">

                2

              </div>


              <h3 className="font-bold text-slate-900 mt-4">

                AI Analysis

              </h3>


              <p className="text-sm text-slate-500 mt-2 leading-6">

                AI checks your resume content and ATS compatibility.

              </p>

            </div>


            {/* STEP 3 */}

            <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm">

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">

                3

              </div>


              <h3 className="font-bold text-slate-900 mt-4">

                Get Insights

              </h3>


              <p className="text-sm text-slate-500 mt-2 leading-6">

                View your score, missing skills and suggestions.

              </p>

            </div>


          </div>

        </section>


      </main>

    </div>

  );
}


export default Resume;