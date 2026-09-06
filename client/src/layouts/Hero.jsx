import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaRobot,
  FaBriefcase,
  FaCheckCircle,
  FaFileAlt,
} from "react-icons/fa";

const Skill = ({ name, score, width }) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">{name}</span>
        <span className="text-sm font-semibold text-blue-600">{score}</span>
      </div>

      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="h-full bg-blue-600 rounded-full"
        />
      </div>
    </div>
  );
};

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold">
              <FaRobot />
              AI-Powered Career Platform
            </div>

            <h1 className="mt-7 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              Build Your Career
              <span className="block text-blue-600 mt-2">
                With AI-Powered Matching
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-xl">
              Analyze your resume, improve your ATS score, discover missing
              skills and find job opportunities that match your profile.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-lg transition shadow-lg shadow-blue-600/20"
              >
                Get Started
                <FaArrowRight className="group-hover:translate-x-1 transition" />
              </Link>

              <Link
                to="/seeker/jobs"
                className="inline-flex items-center gap-2 border border-slate-300 hover:border-blue-600 hover:text-blue-600 bg-white text-slate-700 font-semibold px-7 py-3.5 rounded-lg transition"
              >
                Explore Jobs
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-8 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-600" />
                AI Resume Analysis
              </span>

              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-600" />
                Smart Job Matching
              </span>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-7 max-w-md mx-auto"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Resume Analysis
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    Your Resume Score
                  </h3>
                </div>

                <div className="w-20 h-20 rounded-full border-8 border-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    87%
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                <Skill
                  name="Technical Skills"
                  score="92%"
                  width="92%"
                />

                <Skill
                  name="Experience"
                  score="84%"
                  width="84%"
                />

                <Skill
                  name="ATS Compatibility"
                  score="88%"
                  width="88%"
                />

                <Skill
                  name="Profile Quality"
                  score="90%"
                  width="90%"
                />
              </div>

              <div className="mt-7 p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-sm text-blue-800 font-medium">
                  ✓ Your profile matches multiple job opportunities.
                </p>
              </div>

              <Link
                to="/seeker/resume"
                className="mt-5 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                <FaFileAlt />
                Analyze Resume
              </Link>
            </motion.div>

            {/* JOB MATCH */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -left-3 md:-left-8 bg-white shadow-xl border border-slate-100 rounded-xl px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaBriefcase className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Job Match
                  </p>

                  <p className="font-bold text-slate-900">
                    94% Match
                  </p>
                </div>
              </div>
            </motion.div>

            {/* AI CARD */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-5 -right-2 md:-right-8 bg-white shadow-xl border border-slate-100 rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaRobot className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    AI Analysis
                  </p>

                  <p className="text-sm font-bold text-green-600">
                    Excellent
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Hero;