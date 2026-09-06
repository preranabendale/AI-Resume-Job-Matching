import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiFileText,
  FiTag,
  FiArrowLeft,
} from "react-icons/fi";
import API from "../../services/api";

function PostJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full Time",
    description: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      };

      const token = localStorage.getItem("token");

      const response = await API.post("/jobs/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message || "Job Posted Successfully!");

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        jobType: "Full Time",
        description: "",
        skills: "",
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to post job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-6">

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 font-medium"
        >
          <FiArrowLeft />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <FiBriefcase size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Post a New Job
              </h1>

              <p className="text-slate-500 mt-1">
                Find the right candidate for your company
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
        >

          {/* Job Title */}
          <div className="mb-6">
            <label className="block font-semibold text-slate-700 mb-2">
              Job Title
            </label>

            <div className="relative">
              <FiBriefcase
                className="absolute left-4 top-4 text-slate-400"
                size={20}
              />

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                required
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Company */}
          <div className="mb-6">
            <label className="block font-semibold text-slate-700 mb-2">
              Company Name
            </label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. ABC Technologies"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location + Salary */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">

            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Location
              </label>

              <div className="relative">
                <FiMapPin
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Pune, Maharashtra"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Salary
              </label>

              <div className="relative">
                <FiDollarSign
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />

                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. ₹4 - ₹6 LPA"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

          </div>

          {/* Job Type */}
          <div className="mb-6">
            <label className="block font-semibold text-slate-700 mb-2">
              Job Type
            </label>

            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <label className="block font-semibold text-slate-700 mb-2">
              Required Skills
            </label>

            <div className="relative">
              <FiTag
                className="absolute left-4 top-4 text-slate-400"
                size={20}
              />

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, JavaScript, Node.js, MongoDB"
                required
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <p className="text-sm text-slate-400 mt-2">
              Separate skills with commas
            </p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block font-semibold text-slate-700 mb-2">
              Job Description
            </label>

            <div className="relative">
              <FiFileText
                className="absolute left-4 top-4 text-slate-400"
                size={20}
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the job responsibilities, requirements and qualifications..."
                required
                rows="7"
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3.5 rounded-xl font-semibold transition"
          >
            {loading ? "Posting Job..." : "Post Job"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default PostJob;