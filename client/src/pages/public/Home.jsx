import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaFileAlt,
  FaRobot,
  FaBriefcase,
  FaChartLine,
  FaCheckCircle,
  FaUsers,
  FaBullseye,
  FaUserTie,
  FaStar,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

function Home() {
  const [stats, setStats] = useState({
    jobs: 0,
    users: 0,
    resumes: 0,
    accuracy: 90,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/stats"
        );

        const data = await response.json();

        if (data.success) {
          setStats(data);
        }
      } catch (error) {
        console.error("Stats Error:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-white text-slate-800 overflow-hidden">

      {/* ================= HERO ================= */}

      <section className="relative bg-[#071A2B] text-white overflow-hidden">

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] [background-size:35px_35px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ================= LEFT ================= */}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-sm font-semibold">

                <FaRobot />

                AI-Powered Career Platform

              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mt-6">

                Build Your Career

                <span className="block text-blue-400">
                  With AI
                </span>

              </h1>

              <p className="mt-6 text-lg text-slate-300 leading-8 max-w-xl">

                Analyze your resume, improve your ATS score and discover
                job opportunities that match your skills and profile.

              </p>

              <div className="flex flex-wrap gap-4 mt-9">

                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-7 py-3.5 rounded-lg font-semibold transition shadow-xl shadow-blue-900/30"
                >
                  Get Started
                  <FaArrowRight />
                </Link>

                <Link
                  to="/seeker/jobs"
                  className="inline-flex items-center gap-2 border border-white/30 hover:bg-white hover:text-[#071A2B] px-7 py-3.5 rounded-lg font-semibold transition"
                >
                  Explore Jobs
                </Link>

              </div>

              <div className="flex flex-wrap gap-6 mt-8 text-sm text-slate-300">

                <span className="flex gap-2 items-center">
                  <FaCheckCircle className="text-blue-400" />
                  Resume Analysis
                </span>

                <span className="flex gap-2 items-center">
                  <FaCheckCircle className="text-blue-400" />
                  Smart Job Matching
                </span>

              </div>

            </motion.div>


            {/* ================= AI DASHBOARD ================= */}

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="relative"
            >

              <div className="bg-white rounded-3xl p-7 shadow-2xl">

                {/* Header */}

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-slate-500 text-sm">
                      AI Resume Analysis
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      Analyze Your Resume
                    </h3>

                  </div>

                  <div className="w-20 h-20 rounded-full border-8 border-blue-100 flex items-center justify-center">

                    <FaFileAlt className="text-3xl text-blue-600" />

                  </div>

                </div>


                {/* Main Card */}

                <div className="mt-8">

                  <div className="bg-slate-50 rounded-2xl p-6 text-center">

                    <FaRobot className="text-4xl text-blue-600 mx-auto mb-4" />

                    <h4 className="text-lg font-bold text-slate-800">
                      Get Your Resume Score
                    </h4>

                    <p className="text-sm text-slate-500 mt-2 leading-6">
                      Upload your resume and let AI analyze your
                      skills, experience, ATS compatibility and
                      improvement areas.
                    </p>

                    <Link
                      to="/seeker/resume"
                      className="inline-flex items-center gap-2 mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
                    >
                      Analyze Resume
                      <FaArrowRight />
                    </Link>

                  </div>

                </div>


                {/* Features */}

                <div className="mt-6 grid grid-cols-3 gap-3">

                  <div className="bg-blue-50 rounded-xl p-3 text-center">

                    <FaFileAlt className="text-blue-600 mx-auto mb-2" />

                    <p className="text-xs font-medium text-slate-600">
                      Resume
                    </p>

                  </div>


                  <div className="bg-blue-50 rounded-xl p-3 text-center">

                    <FaChartLine className="text-blue-600 mx-auto mb-2" />

                    <p className="text-xs font-medium text-slate-600">
                      ATS Score
                    </p>

                  </div>


                  <div className="bg-blue-50 rounded-xl p-3 text-center">

                    <FaRobot className="text-blue-600 mx-auto mb-2" />

                    <p className="text-xs font-medium text-slate-600">
                      AI Insights
                    </p>

                  </div>

                </div>

              </div>


              {/* ================= FLOATING JOB CARD ================= */}

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="absolute -bottom-6 -left-5 bg-white rounded-xl shadow-xl p-4"
              >

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center">

                    <FaBriefcase className="text-blue-600" />

                  </div>

                  <div>

                    <p className="text-xs text-slate-500">
                      Job Opportunities
                    </p>

                    <p className="font-bold text-slate-900">
                      {stats.jobs}+
                    </p>

                  </div>

                </div>

              </motion.div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="bg-white border-b">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              [stats.jobs, "Job Opportunities"],
              [stats.users, "Registered Users"],
              [stats.resumes, "Resumes Analysed"],
              [`${stats.accuracy}%`, "Matching Accuracy"],
            ].map(([value, title]) => (

              <motion.div
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                viewport={{ once: true }}
                key={title}
                className="text-center"
              >

                <h3 className="text-3xl font-extrabold text-blue-600">

                  {value}

                  {typeof value === "number" ? "+" : ""}

                </h3>

                <p className="text-slate-500 mt-2">
                  {title}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto"
          >

            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">
              Our Solutions
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#071A2B] mt-3">
              Everything You Need For Your Career
            </h2>

            <p className="text-slate-500 mt-5 leading-7">
              Powerful tools designed to help candidates improve their
              resumes and find the right opportunities.
            </p>

          </motion.div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

            {[
              {
                icon: <FaFileAlt />,
                title: "Resume Analysis",
                text: "Analyze your resume and understand your strengths and improvement areas.",
              },
              {
                icon: <FaRobot />,
                title: "AI Insights",
                text: "Get intelligent suggestions to improve your career profile.",
              },
              {
                icon: <FaBriefcase />,
                title: "Job Matching",
                text: "Discover jobs based on your skills and career profile.",
              },
              {
                icon: <FaChartLine />,
                title: "ATS Score",
                text: "Understand your ATS performance and improve your resume.",
              },
            ].map((item) => (

              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
                key={item.title}
                className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl"
              >

                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-2xl text-blue-600">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-[#071A2B] mt-6">
                  {item.title}
                </h3>

                <p className="text-slate-500 mt-3 leading-7">
                  {item.text}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center">

            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">
              Simple Process
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#071A2B] mt-3">
              How It Works
            </h2>

          </div>


          <div className="grid md:grid-cols-4 gap-8 mt-14">

            {[
              ["01", "Create Account", "Register and create your career profile."],
              ["02", "Upload Resume", "Upload your resume in PDF format."],
              ["03", "Get AI Analysis", "Receive ATS score and AI insights."],
              ["04", "Find Your Job", "Discover and apply for matching jobs."],
            ].map(([number, title, text]) => (

              <motion.div
                whileInView={{ opacity: [0, 1], y: [30, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                key={number}
                className="text-center"
              >

                <div className="w-16 h-16 mx-auto rounded-full bg-[#071A2B] text-white flex items-center justify-center font-bold text-xl">
                  {number}
                </div>

                <h3 className="text-xl font-bold text-[#071A2B] mt-5">
                  {title}
                </h3>

                <p className="text-slate-500 mt-3 leading-7">
                  {text}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= WHY US ================= */}

      <section className="py-24 bg-[#071A2B] text-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">
                Why Choose Us
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
                Make Your Job Search Smarter With AI
              </h2>

              <p className="text-slate-300 mt-6 leading-8">
                Stop applying blindly. Understand your resume, identify
                missing skills and discover opportunities that match your
                profile.
              </p>


              <div className="space-y-5 mt-8">

                {[
                  "AI-powered resume analysis",
                  "ATS score and recommendations",
                  "Skill-based job matching",
                  "Recruiter and candidate platform",
                ].map((item) => (

                  <div key={item} className="flex gap-3 items-center">

                    <FaCheckCircle className="text-blue-400" />

                    <span className="text-slate-200">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>


            {/* Stats Cards */}

            <div className="grid grid-cols-2 gap-5">

              <div className="bg-white/10 border border-white/10 rounded-2xl p-7">

                <FaUsers className="text-3xl text-blue-400" />

                <h3 className="text-3xl font-bold mt-5">
                  {stats.users}+
                </h3>

                <p className="text-slate-300 mt-1">
                  Users
                </p>

              </div>


              <div className="bg-white/10 border border-white/10 rounded-2xl p-7 mt-8">

                <FaBriefcase className="text-3xl text-blue-400" />

                <h3 className="text-3xl font-bold mt-5">
                  {stats.jobs}+
                </h3>

                <p className="text-slate-300 mt-1">
                  Jobs
                </p>

              </div>


              <div className="bg-white/10 border border-white/10 rounded-2xl p-7">

                <FaBullseye className="text-3xl text-blue-400" />

                <h3 className="text-3xl font-bold mt-5">
                  {stats.accuracy}%
                </h3>

                <p className="text-slate-300 mt-1">
                  Accuracy
                </p>

              </div>


              <div className="bg-white/10 border border-white/10 rounded-2xl p-7 mt-8">

                <FaFileAlt className="text-3xl text-blue-400" />

                <h3 className="text-3xl font-bold mt-5">
                  {stats.resumes}+
                </h3>

                <p className="text-slate-300 mt-1">
                  Resumes
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= TESTIMONIAL STYLE ================= */}

      <section className="py-24 bg-slate-50">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <FaStar className="text-4xl text-blue-600 mx-auto" />

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#071A2B] mt-6">
            Your Career. Your Skills. Your Opportunity.
          </h2>

          <p className="text-slate-500 text-lg mt-5 leading-8">
            Build a stronger profile, understand your potential and take
            the next step towards your career goals.
          </p>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="relative overflow-hidden bg-blue-600">

        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-500 opacity-70" />

        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center text-white">

          <FaUserTie className="text-5xl mx-auto mb-6" />

          <h2 className="text-3xl md:text-4xl font-extrabold">
            Ready To Take The Next Step?
          </h2>

          <p className="text-blue-100 mt-5 text-lg">
            Create your profile, upload your resume and discover better
            opportunities.
          </p>

          <div className="flex justify-center gap-4 flex-wrap mt-8">

            <Link
              to="/register"
              className="bg-white text-blue-600 px-7 py-3.5 rounded-lg font-bold hover:bg-slate-100 transition inline-flex items-center gap-2"
            >
              Get Started
              <FaArrowRight />
            </Link>

            <Link
              to="/about"
              className="border border-white/60 px-7 py-3.5 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition"
            >
              Learn More
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;