import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaArrowRight,
  FaRobot,
} from "react-icons/fa";
import API from "../../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("All");

  const [resumeSkills, setResumeSkills] = useState([]);

  // ================= FETCH JOBS =================
  useEffect(() => {
    fetchJobs();
    loadResumeSkills();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/jobs");
      const data = response.data;

      const jobList = Array.isArray(data)
        ? data
        : Array.isArray(data.jobs)
        ? data.jobs
        : [];

      setJobs(jobList);
      setFilteredJobs(jobList);
    } catch (err) {
      console.error("Jobs Fetch Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load jobs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD RESUME SKILLS =================
  const loadResumeSkills = () => {
    try {
      const savedAnalysis = localStorage.getItem("resumeAnalysis");

      if (!savedAnalysis) {
        setResumeSkills([]);
        return;
      }

      const analysis = JSON.parse(savedAnalysis);

      const skills = Array.isArray(analysis?.detectedSkills)
        ? analysis.detectedSkills
        : [];

      setResumeSkills(skills);
    } catch (error) {
      console.error("Resume Skills Error:", error);
      setResumeSkills([]);
    }
  };

  // ================= MATCH CALCULATION =================
  const calculateMatch = (job) => {
    if (!resumeSkills.length || !job.skills?.length) {
      return 0;
    }

    const userSkills = resumeSkills.map((skill) =>
      String(skill).trim().toLowerCase()
    );

    const requiredSkills = job.skills.map((skill) =>
      String(skill).trim().toLowerCase()
    );

    const matchedSkills = requiredSkills.filter((skill) =>
      userSkills.some(
        (userSkill) =>
          userSkill === skill ||
          userSkill.includes(skill) ||
          skill.includes(userSkill)
      )
    );

    return Math.round(
      (matchedSkills.length / requiredSkills.length) * 100
    );
  };

  // ================= SEARCH + FILTER + MATCH =================
  useEffect(() => {
    let result = [...jobs];

    if (search.trim()) {
      const searchText = search.toLowerCase();

      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchText) ||
          job.company?.toLowerCase().includes(searchText) ||
          job.description?.toLowerCase().includes(searchText) ||
          job.skills?.some((skill) =>
            skill.toLowerCase().includes(searchText)
          )
      );
    }

    if (location.trim()) {
      const locationText = location.toLowerCase();

      result = result.filter((job) =>
        job.location?.toLowerCase().includes(locationText)
      );
    }

    if (jobType !== "All") {
      result = result.filter(
        (job) => job.jobType === jobType
      );
    }

    const jobsWithMatch = result.map((job) => ({
      ...job,
      matchPercentage: calculateMatch(job),
    }));

    setFilteredJobs(jobsWithMatch);

    // Recommended jobs
    if (resumeSkills.length > 0) {
      const recommended = jobsWithMatch
        .filter((job) => job.matchPercentage > 0)
        .sort(
          (a, b) =>
            b.matchPercentage - a.matchPercentage
        )
        .slice(0, 3);

      setRecommendedJobs(recommended);
    } else {
      setRecommendedJobs([]);
    }
  }, [
    search,
    location,
    jobType,
    jobs,
    resumeSkills,
  ]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-100 blur-3xl opacity-60" />

        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-blue-50 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold">
              <FaRobot />
              AI-Powered Job Matching
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-6 leading-tight">
              Find Your
              <span className="text-blue-600">
                {" "}Dream Job
              </span>
            </h1>

            <p className="text-lg text-slate-500 mt-5 leading-8">
              Discover job opportunities that match your
              resume skills and career goals.
            </p>

          </div>
        </div>
      </section>

      {/* ================= SEARCH ================= */}

      <section className="relative -mt-8">
        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5">

            <div className="grid md:grid-cols-3 gap-4">

              {/* Search */}

              <div className="relative">
                <FaSearch className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search job, company or skill..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Location */}

              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Job Type */}

              <select
                value={jobType}
                onChange={(e) =>
                  setJobType(e.target.value)
                }
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="All">
                  All Job Types
                </option>

                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Remote">
                  Remote
                </option>
              </select>

            </div>

          </div>
        </div>
      </section>

      {/* ================= RECOMMENDED JOBS ================= */}

      {!loading &&
        !error &&
        resumeSkills.length > 0 &&
        recommendedJobs.length > 0 && (

          <section className="pt-14">
            <div className="max-w-7xl mx-auto px-6">

              <div className="mb-7">

                <div className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                  <FaRobot />
                  AI Recommendations
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  Recommended Jobs For You
                </h2>

                <p className="text-slate-500 mt-2">
                  Jobs matched with your resume skills.
                </p>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {recommendedJobs.map((job) => (
                  <JobCard
                    key={`recommended-${job._id}`}
                    job={job}
                    matchPercentage={job.matchPercentage}
                  />
                ))}

              </div>

            </div>
          </section>
        )}

      {/* ================= ALL JOBS ================= */}

      <section className="py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

            <div>
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                Available Opportunities
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                Latest Jobs
              </h2>
            </div>

            <div className="text-sm text-slate-500">
              {filteredJobs.length} jobs found
            </div>

          </div>

          {/* Resume information */}

          {resumeSkills.length > 0 && (
            <div className="mb-7 bg-blue-50 border border-blue-100 rounded-2xl p-5">

              <div className="flex items-start gap-3">

                <FaRobot className="text-blue-600 mt-1" />

                <div>

                  <h3 className="font-semibold text-slate-900">
                    AI Job Matching Active
                  </h3>

                  <p className="text-sm text-slate-600 mt-1">
                    Jobs are matched using the skills detected
                    from your uploaded resume.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* Loading */}

          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-2xl border border-slate-100 p-6 animate-pulse"
                >
                  <div className="w-14 h-14 bg-slate-200 rounded-xl" />

                  <div className="h-5 bg-slate-200 rounded mt-6 w-3/4" />

                  <div className="h-4 bg-slate-200 rounded mt-3 w-1/2" />

                  <div className="h-4 bg-slate-200 rounded mt-6 w-full" />

                  <div className="h-4 bg-slate-200 rounded mt-2 w-5/6" />
                </div>
              ))}

            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="bg-white rounded-2xl border border-red-100 p-10 text-center">

              <h3 className="text-xl font-bold text-slate-900">
                Unable to Load Jobs
              </h3>

              <p className="text-slate-500 mt-2">
                {error}
              </p>

              <button
                onClick={fetchJobs}
                className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Try Again
              </button>

            </div>
          )}

          {/* No Jobs */}

          {!loading &&
            !error &&
            filteredJobs.length === 0 && (

              <div className="bg-white rounded-2xl border border-slate-100 p-14 text-center">

                <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
                  <FaBriefcase />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mt-5">
                  No Jobs Found
                </h3>

                <p className="text-slate-500 mt-2">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setLocation("");
                    setJobType("All");
                  }}
                  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Clear Filters
                </button>

              </div>
            )}

          {/* Job Cards */}

          {!loading &&
            !error &&
            filteredJobs.length > 0 && (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredJobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    matchPercentage={job.matchPercentage}
                  />
                ))}

              </div>
            )}

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="py-20 bg-blue-600">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Want Better Job Matches?
          </h2>

          <p className="text-blue-100 text-lg mt-4">
            Upload your resume and let AI match your skills
            with available jobs.
          </p>

          <Link
            to="/seeker/resume"
            className="inline-flex items-center gap-2 mt-8 bg-white text-blue-600 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-100 transition"
          >
            Analyze My Resume
            <FaArrowRight />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Jobs;