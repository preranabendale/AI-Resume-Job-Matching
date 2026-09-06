import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaArrowRight,
  FaRobot,
} from "react-icons/fa";
import API from "../../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("All");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/jobs");

      const data = response.data;

      // Backend agar array directly bhej raha hai
      if (Array.isArray(data)) {
        setJobs(data);
        setFilteredJobs(data);
      }

      // Backend agar { jobs: [] } bhej raha hai
      else if (Array.isArray(data.jobs)) {
        setJobs(data.jobs);
        setFilteredJobs(data.jobs);
      }

      else {
        setJobs([]);
        setFilteredJobs([]);
      }

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

  // Search + Filter
  useEffect(() => {
    let result = [...jobs];

    if (search.trim()) {
      const searchText = search.toLowerCase();

      result = result.filter((job) =>
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

    setFilteredJobs(result);
  }, [search, location, jobType, jobs]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-white border-b border-slate-100">

        {/* Background decoration */}

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

              Discover job opportunities that match your skills,
              experience and career goals.

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

                <FaSearch
                  className="absolute left-4 top-4 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search job, company or skill..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>


              {/* Location */}

              <div className="relative">

                <FaMapMarkerAlt
                  className="absolute left-4 top-4 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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


      {/* ================= JOBS ================= */}

      <section className="py-16">

        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}

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
            Upload your resume and let AI find opportunities
            that match your skills.
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