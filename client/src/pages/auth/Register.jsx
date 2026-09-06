import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

import {
  FaRobot,
  FaBriefcase,
  FaFileAlt,
} from "react-icons/fa";

import API from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "seeker",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <div className="hidden lg:block relative bg-[#071A2B] text-white overflow-hidden">

          {/* Background effects */}

          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="relative h-full p-12 flex flex-col justify-center">

            {/* Logo */}

            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="flex items-center gap-3"
            >

              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">

                <FaRobot className="text-xl" />

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  AI Resume
                </h2>

                <p className="text-xs text-slate-400">
                  Career Intelligence
                </p>

              </div>

            </motion.div>


            {/* Main Content */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="mt-14"
            >

              <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">
                Start Your Journey
              </p>

              <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight mt-4">

                Build Your Future

                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  With AI
                </span>

              </h1>

              <p className="text-slate-300 leading-7 mt-6 max-w-md">
                Create your account and use AI-powered
                tools to analyze your resume, improve your
                ATS score and find better career opportunities.
              </p>

            </motion.div>


            {/* FEATURES */}

            <div className="mt-10 space-y-5">

              {/* Feature 1 */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                }}
                className="flex items-center gap-4"
              >

                <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">

                  <FaFileAlt className="text-blue-400" />

                </div>

                <div>

                  <h3 className="font-semibold">
                    AI Resume Analysis
                  </h3>

                  <p className="text-sm text-slate-400">
                    Understand and improve your resume
                  </p>

                </div>

              </motion.div>


              {/* Feature 2 */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                }}
                className="flex items-center gap-4"
              >

                <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">

                  <FaBriefcase className="text-cyan-400" />

                </div>

                <div>

                  <h3 className="font-semibold">
                    Smart Job Matching
                  </h3>

                  <p className="text-sm text-slate-400">
                    Discover jobs based on your skills
                  </p>

                </div>

              </motion.div>


              {/* Feature 3 */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                }}
                className="flex items-center gap-4"
              >

                <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">

                  <FiCheckCircle className="text-green-400" />

                </div>

                <div>

                  <h3 className="font-semibold">
                    ATS Optimization
                  </h3>

                  <p className="text-sm text-slate-400">
                    Improve your chances of getting hired
                  </p>

                </div>

              </motion.div>

            </div>

          </div>

        </div>


        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="flex items-center justify-center p-7 sm:p-10 lg:p-12"
        >

          <div className="w-full max-w-md">

            {/* Mobile Logo */}

            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">

              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">

                <FaRobot />

              </div>

              <div>

                <h2 className="font-bold text-slate-900">
                  AI Resume
                </h2>

                <p className="text-xs text-slate-500">
                  Career Intelligence
                </p>

              </div>

            </div>


            {/* TITLE */}

            <div className="text-center">

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Create Account
              </h2>

              <p className="text-slate-500 mt-3">
                Join us and start your career journey
              </p>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* FULL NAME */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <FiUser
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                  />

                </div>

              </div>


              {/* EMAIL */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <FiMail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <FiLock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                  >

                    {showPassword ? (
                      <FiEyeOff size={19} />
                    ) : (
                      <FiEye size={19} />
                    )}

                  </button>

                </div>

              </div>


              {/* ROLE */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Register As
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                >

                  <option value="seeker">
                    Job Seeker
                  </option>

                  <option value="recruiter">
                    Recruiter
                  </option>

                </select>

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-cyan-400 hover:-translate-y-0.5 transition-all duration-300"
              >

                Create Account

                <FiArrowRight />

              </button>

            </form>


            {/* LOGIN */}

            <p className="text-center text-slate-500 mt-7">

              Already have an account?

              <Link
                to="/login"
                className="ml-2 text-blue-600 font-semibold hover:text-blue-700"
              >
                Login
              </Link>

            </p>


            {/* SECURITY */}

            <div className="flex justify-center items-center gap-2 mt-7 text-xs text-slate-400">

              <FiCheckCircle className="text-green-500" />

              Your information is securely protected

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Register;