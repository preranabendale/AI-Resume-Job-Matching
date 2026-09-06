import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#061827] text-white">

      {/* CTA SECTION */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

          <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-600 px-7 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">

            <div>
              <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider">
                Start Your Career Journey
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                Ready to find your dream job?
              </h2>

              <p className="text-blue-100 mt-3 max-w-xl">
                Upload your resume, improve your profile and discover
                opportunities that match your skills.
              </p>
            </div>

            <Link
              to="/register"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition"
            >
              Get Started
              <FaArrowRight className="text-sm" />
            </Link>

          </div>

        </div>
      </div>


      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>

            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold">
                AI<span className="text-cyan-400">Match</span>
              </h2>
            </Link>

            <p className="text-slate-400 leading-7 mt-5 max-w-sm">
              AI-powered resume analysis and intelligent job matching
              platform designed to help you build a better career.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-3 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
              >
                <FaTwitter />
              </a>

            </div>

          </div>


          {/* COMPANY */}
          <div>

            <h3 className="text-lg font-semibold">
              Company
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>


          {/* FOR JOB SEEKERS */}
          <div>

            <h3 className="text-lg font-semibold">
              Job Seekers
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/register"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  Create Account
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/seeker/jobs"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  Find Jobs
                </Link>
              </li>

            </ul>

          </div>


          {/* FEATURES */}
          <div>

            <h3 className="text-lg font-semibold">
              Platform
            </h3>

            <ul className="mt-5 space-y-3">

              <li className="text-slate-400">
                AI Resume Analysis
              </li>

              <li className="text-slate-400">
                ATS Score
              </li>

              <li className="text-slate-400">
                Smart Job Matching
              </li>

              <li className="text-slate-400">
                Skill Analysis
              </li>

            </ul>

          </div>

        </div>

      </div>


      {/* COPYRIGHT */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} AIMatch. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            AI-powered career platform
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;