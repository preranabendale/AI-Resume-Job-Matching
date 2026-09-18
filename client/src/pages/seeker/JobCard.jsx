import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

import API from "../../services/api";

function JobCard({ job, matchPercentage = 0 }) {
  const navigate = useNavigate();

  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const resumeId = localStorage.getItem("resumeId");

      if (!resumeId) {
        alert("Please upload your resume first.");
        navigate("/seeker/resume");
        return;
      }

      setApplying(true);

      const response = await API.post(
        "/applications/apply",
        {
          jobId: job._id,
          resumeId: resumeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setApplied(true);
        alert("Job Applied Successfully!");
      }
    } catch (error) {
      console.log("Apply Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to apply for this job."
      );
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition duration-300 p-6">

      {/* Header */}

      <div className="flex items-start justify-between gap-4 mb-5">

        <div>

          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
            <FiBriefcase size={24} />
          </div>

          <h2 className="text-xl font-bold text-slate-800">
            {job.title}
          </h2>

          <p className="text-slate-500 mt-1">
            {job.company}
          </p>

        </div>

        <div className="flex flex-col items-end gap-2">

          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            {job.jobType}
          </span>

          {/* Match Percentage */}

          {matchPercentage > 0 && (
            <span
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                matchPercentage >= 80
                  ? "bg-green-50 text-green-600"
                  : matchPercentage >= 50
                  ? "bg-yellow-50 text-yellow-600"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {matchPercentage}% Match
            </span>
          )}

        </div>

      </div>

      {/* Job Details */}

      <div className="space-y-3 text-sm text-slate-600 mb-5">

        <div className="flex items-center gap-2">
          <FiMapPin className="text-blue-500" />
          {job.location}
        </div>

        <div className="flex items-center gap-2">
          <FiDollarSign className="text-blue-500" />
          {job.salary}
        </div>

        <div className="flex items-center gap-2">
          <FiClock className="text-blue-500" />
          {job.jobType}
        </div>

      </div>

      {/* Description */}

      <p className="text-slate-600 text-sm leading-6 mb-5">
        {job.description}
      </p>

      {/* Skills */}

      {job.skills && job.skills.length > 0 && (

        <div className="flex flex-wrap gap-2 mb-6">

          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}

        </div>
      )}

      {/* Apply */}

      <button
        onClick={handleApply}
        disabled={applying || applied}
        className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
          applied
            ? "bg-green-100 text-green-700 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >

        {applying ? (
          "Applying..."
        ) : applied ? (
          <>
            <FiCheckCircle />
            Applied
          </>
        ) : (
          "Apply Now"
        )}

      </button>

    </div>
  );
}

export default JobCard;