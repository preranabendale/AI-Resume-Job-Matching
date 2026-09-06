import {
  FaRobot,
  FaFileAlt,
  FaBriefcase,
  FaChartLine,
  FaCheckCircle,
  FaBullseye,
  FaUsers,
} from "react-icons/fa";

function About() {
  return (
    <div className="bg-white text-slate-800">

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-50">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-50 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">

          <div className="max-w-3xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-semibold text-sm">
              <FaRobot />
              About ResumeAI
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-6">
              Make Your Job Search
              <span className="block text-blue-600">
                Smarter With AI
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-8 mt-6">
              ResumeAI is an AI-powered career platform designed to help
              job seekers analyze their resumes, improve ATS performance,
              discover missing skills and find suitable job opportunities.
            </p>

          </div>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>

              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                Our Mission
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
                Helping Candidates Find Better Opportunities
              </h2>

              <p className="text-slate-500 leading-8 mt-6">
                Searching for a job can be difficult when you don't know
                whether your resume is strong enough or whether a job
                actually matches your skills.
              </p>

              <p className="text-slate-500 leading-8 mt-4">
                ResumeAI brings resume analysis, ATS scoring, AI insights
                and job matching together in one simple platform.
              </p>

              <div className="space-y-4 mt-7">

                <div className="flex gap-3">
                  <FaCheckCircle className="text-blue-600 mt-1" />
                  <span>AI-powered resume analysis</span>
                </div>

                <div className="flex gap-3">
                  <FaCheckCircle className="text-blue-600 mt-1" />
                  <span>ATS score improvement</span>
                </div>

                <div className="flex gap-3">
                  <FaCheckCircle className="text-blue-600 mt-1" />
                  <span>Skill-based job recommendations</span>
                </div>

                <div className="flex gap-3">
                  <FaCheckCircle className="text-blue-600 mt-1" />
                  <span>Simple and user-friendly experience</span>
                </div>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-5">

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-7">
                <FaUsers className="text-3xl text-blue-600" />

                <h3 className="text-3xl font-bold text-slate-900 mt-5">
                  500+
                </h3>

                <p className="text-slate-500 mt-1">
                  Candidates
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-7 mt-8">
                <FaBriefcase className="text-3xl text-blue-600" />

                <h3 className="text-3xl font-bold text-slate-900 mt-5">
                  1000+
                </h3>

                <p className="text-slate-500 mt-1">
                  Jobs
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-7">
                <FaBullseye className="text-3xl text-blue-600" />

                <h3 className="text-3xl font-bold text-slate-900 mt-5">
                  90%+
                </h3>

                <p className="text-slate-500 mt-1">
                  Match Accuracy
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-7 mt-8">
                <FaChartLine className="text-3xl text-blue-600" />

                <h3 className="text-3xl font-bold text-slate-900 mt-5">
                  Smart
                </h3>

                <p className="text-slate-500 mt-1">
                  Career Insights
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="py-20 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
              What We Provide
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              Everything You Need For Your Career
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

            <Feature
              icon={<FaFileAlt />}
              title="Resume Analysis"
              text="Analyze your resume and understand its strengths and weaknesses."
            />

            <Feature
              icon={<FaRobot />}
              title="AI Insights"
              text="Get intelligent suggestions to improve your career profile."
            />

            <Feature
              icon={<FaBriefcase />}
              title="Job Matching"
              text="Find job opportunities based on your skills and profile."
            />

            <Feature
              icon={<FaChartLine />}
              title="ATS Score"
              text="Understand your ATS compatibility and improve your resume."
            />

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready To Build Your Career?
          </h2>

          <p className="text-blue-100 text-lg mt-5">
            Start analyzing your resume and discover better opportunities.
          </p>

        </div>

      </section>

    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">

      <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mt-6">
        {title}
      </h3>

      <p className="text-slate-500 leading-7 mt-3">
        {text}
      </p>

    </div>
  );
}

export default About;