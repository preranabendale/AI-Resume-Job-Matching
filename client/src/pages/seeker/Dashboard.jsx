import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaBriefcase,
  FaRobot,
  FaChartLine,
  FaArrowRight,
  FaCheckCircle,
  FaSearch,
  FaUpload,
  FaUserTie,
  FaPlus,
} from "react-icons/fa";
import API from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    users: 0,
    resumes: 0,
    accuracy: 90,
  });

  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isRecruiter = user.role === "recruiter";

  useEffect(() => {
    fetchStats();

    if (isRecruiter) {
      fetchMyJobs();
    }
  }, [isRecruiter]);

  // ================= FETCH STATS =================

  const fetchStats = async () => {
    try {
      const res = await API.get("/stats");

      if (res.data.success) {
        setStats({
          jobs: res.data.jobs || 0,
          users: res.data.users || 0,
          resumes: res.data.resumes || 0,
          accuracy: res.data.accuracy || 90,
        });
      }
    } catch (error) {
      console.error("Dashboard Stats Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH RECRUITER JOBS =================

  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/jobs/my/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setMyJobs(res.data.jobs || []);
      }
    } catch (error) {
      console.error("My Jobs Error:", error);
    }
  };

  // =====================================================
  // RECRUITER DASHBOARD
  // =====================================================

  if (isRecruiter) {
    return (
      <div className="min-h-screen bg-slate-50">

        {/* ================= HEADER ================= */}

        <section className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-10">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>
                <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                  Recruiter Dashboard
                </p>

                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                  Welcome back
                  {user.fullName ? `, ${user.fullName}` : ""}! 👋
                </h1>

                <p className="text-slate-500 mt-3">
                  Manage your job postings and find the right candidates.
                </p>
              </div>

              <Link
                to="/recruiter/post-job"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-600/20"
              >
                <FaPlus />
                Post a Job
              </Link>

            </div>

          </div>
        </section>

        {/* ================= MAIN ================= */}

        <main className="max-w-7xl mx-auto px-6 py-10">

          {/* ================= STATS ================= */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <StatCard
              icon={<FaBriefcase />}
              title="Total Jobs"
              value={loading ? "..." : stats.jobs}
              description="Jobs posted on platform"
            />

            <StatCard
              icon={<FaUserTie />}
              title="Candidates"
              value={loading ? "..." : stats.users}
              description="Registered candidates"
            />

            <StatCard
              icon={<FaFileAlt />}
              title="Resumes"
              value={loading ? "..." : stats.resumes}
              description="Resumes uploaded"
            />

            <StatCard
              icon={<FaChartLine />}
              title="AI Accuracy"
              value={`${stats.accuracy}%`}
              description="Matching accuracy"
            />

          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <section className="mt-10">

            <div className="mb-6">
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Quick Actions
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                Manage Recruitment
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

              {/* POST JOB */}

              <ActionCard
                icon={<FaPlus />}
                title="Post a Job"
                description="Create a new job vacancy and find qualified candidates for your company."
                link="/recruiter/post-job"
                button="Post Job"
              />

              {/* MY JOBS */}

              <ActionCard
                icon={<FaBriefcase />}
                title="My Posted Jobs"
                description="View and manage all the jobs you have posted on the platform."
                link="#my-jobs"
                button="View Jobs"
              />

              {/* CANDIDATES */}

              <ActionCard
                icon={<FaUserTie />}
                title="Candidates"
                description="Explore candidates and find profiles that match your job requirements."
                link="#candidates"
                button="View Candidates"
              />

            </div>

          </section>

          {/* ================= MY JOBS ================= */}

          <section
            id="my-jobs"
            className="mt-10"
          >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

              <div>
                <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                  Job Management
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  My Posted Jobs
                </h2>

                <p className="text-slate-500 mt-1">
                  Manage the jobs posted by you.
                </p>
              </div>

              <Link
                to="/recruiter/post-job"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                <FaPlus />
                Post New Job
              </Link>

            </div>

            {myJobs.length === 0 ? (

              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-10 text-center">

                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
                  <FaBriefcase />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-5">
                  No Jobs Posted Yet
                </h3>

                <p className="text-slate-500 mt-2">
                  Start by posting your first job vacancy.
                </p>

                <Link
                  to="/recruiter/post-job"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold mt-6"
                >
                  <FaPlus />
                  Post Your First Job
                </Link>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {myJobs.map((job) => (

                  <div
                    key={job._id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-lg transition"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                        <FaBriefcase />
                      </div>

                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                        {job.jobType}
                      </span>

                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mt-5">
                      {job.title}
                    </h3>

                    <p className="text-slate-600 font-medium mt-2">
                      {job.company}
                    </p>

                    <p className="text-slate-500 text-sm mt-2">
                      📍 {job.location}
                    </p>

                    <p className="text-slate-500 text-sm mt-1">
                      💰 {job.salary}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">

                      {job.skills?.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs"
                        >
                          {skill}
                        </span>
                      ))}

                    </div>

                    <p className="text-sm text-slate-500 mt-4 line-clamp-3">
                      {job.description}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </section>

        </main>

      </div>
    );
  }

  // =====================================================
  // SEEKER DASHBOARD
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= WELCOME HEADER ================= */}

      <section className="bg-white border-b border-slate-100">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Dashboard
              </p>

              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                Welcome back
                {user.fullName ? `, ${user.fullName}` : ""}! 👋
              </h1>

              <p className="text-slate-500 mt-3">
                Track your resume, discover jobs and improve your career
                profile with AI.
              </p>

            </div>

            <Link
              to="/seeker/resume"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-600/20"
            >
              <FaUpload />
              Upload Resume
            </Link>

          </div>

        </div>

      </section>

      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* ================= STAT CARDS ================= */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard
            icon={<FaBriefcase />}
            title="Available Jobs"
            value={loading ? "..." : `${stats.jobs}+`}
            description="Job opportunities"
          />

          <StatCard
            icon={<FaFileAlt />}
            title="Resumes Analyzed"
            value={loading ? "..." : `${stats.resumes}+`}
            description="Resume analysis"
          />

          <StatCard
            icon={<FaChartLine />}
            title="Match Accuracy"
            value={`${stats.accuracy}%`}
            description="AI matching accuracy"
          />

          <StatCard
            icon={<FaUserTie />}
            title="Candidates"
            value={loading ? "..." : `${stats.users}+`}
            description="Registered users"
          />

        </div>

        {/* ================= QUICK ACTIONS ================= */}

        <section className="mt-10">

          <div className="mb-6">

            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Quick Actions
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Manage Your Career
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <ActionCard
              icon={<FaFileAlt />}
              title="Resume Analysis"
              description="Upload your resume and check your ATS score, skills and improvement suggestions."
              link="/seeker/resume"
              button="Analyze Resume"
            />

            <ActionCard
              icon={<FaRobot />}
              title="AI Analysis"
              description="Get AI-powered insights about your resume and discover missing skills."
              link="/seeker/ai-analysis"
              button="View Analysis"
            />

            <ActionCard
              icon={<FaSearch />}
              title="Find Jobs"
              description="Explore job opportunities that match your skills and career profile."
              link="/seeker/jobs"
              button="Explore Jobs"
            />

          </div>

        </section>

        {/* ================= RESUME STATUS ================= */}

        <section className="grid lg:grid-cols-3 gap-6 mt-10">

          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaFileAlt />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Resume Status
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Your current resume performance
                  </p>

                </div>

              </div>

              <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-semibold">
                Good
              </span>

            </div>

            <div className="mt-8">

              <div className="flex justify-between mb-2">

                <span className="text-sm font-medium text-slate-600">
                  ATS Score
                </span>

                <span className="text-sm font-bold text-blue-600">
                  87%
                </span>

              </div>

              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "87%" }}
                />

              </div>

            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">

              <MiniScore
                title="Technical Skills"
                score="92%"
              />

              <MiniScore
                title="ATS Compatibility"
                score="88%"
              />

              <MiniScore
                title="Content Quality"
                score="82%"
              />

            </div>

            <Link
              to="/seeker/ai-analysis"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold mt-7 hover:gap-3 transition-all"
            >
              View Detailed Analysis
              <FaArrowRight />
            </Link>

          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">

            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-2xl">
              <FaRobot />
            </div>

            <h2 className="text-2xl font-bold mt-6">
              Improve Your Profile
            </h2>

            <p className="text-blue-100 mt-3 leading-7">
              Use AI recommendations to improve your resume and increase
              your chances of getting shortlisted.
            </p>

            <div className="space-y-3 mt-6">

              <CheckItem text="Improve ATS score" />

              <CheckItem text="Add missing skills" />

              <CheckItem text="Find matching jobs" />

            </div>

            <Link
              to="/seeker/ai-analysis"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-3 rounded-xl font-semibold mt-7 hover:bg-blue-50 transition"
            >
              Improve Resume
              <FaArrowRight />
            </Link>

          </div>

        </section>

        {/* ================= JOB MATCH CTA ================= */}

        <section className="mt-10 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-start gap-4">

              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl flex-shrink-0">
                <FaBriefcase />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Ready to find your next opportunity?
                </h2>

                <p className="text-slate-500 mt-2">
                  Explore jobs based on your skills and career profile.
                </p>

              </div>

            </div>

            <Link
              to="/seeker/jobs"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              View Jobs
              <FaArrowRight />
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}


/* ================================================= */
/* STAT CARD */
/* ================================================= */

function StatCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
        {icon}
      </div>

      <p className="text-sm text-slate-500 mt-5">
        {title}
      </p>

      <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
        {value}
      </h3>

      <p className="text-sm text-slate-400 mt-1">
        {description}
      </p>

    </div>
  );
}


/* ================================================= */
/* ACTION CARD */
/* ================================================= */

function ActionCard({
  icon,
  title,
  description,
  link,
  button,
}) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mt-6">
        {title}
      </h3>

      <p className="text-slate-500 mt-3 leading-7">
        {description}
      </p>

      <Link
        to={link}
        className="inline-flex items-center gap-2 text-blue-600 font-semibold mt-6 hover:gap-3 transition-all"
      >
        {button}
        <FaArrowRight />
      </Link>

    </div>
  );
}


/* ================================================= */
/* MINI SCORE */
/* ================================================= */

function MiniScore({ title, score }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">

      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="text-xl font-bold text-slate-900 mt-1">
        {score}
      </p>

    </div>
  );
}


/* ================================================= */
/* CHECK ITEM */
/* ================================================= */

function CheckItem({ text }) {
  return (
    <div className="flex items-center gap-3">

      <FaCheckCircle className="text-blue-200" />

      <span className="text-sm text-blue-50">
        {text}
      </span>

    </div>
  );
}


export default Dashboard;