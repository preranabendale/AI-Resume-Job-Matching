import { ArrowRight, FileText, Briefcase, Sparkles } from "lucide-react";
import Container from "../ui/Container";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
    
          <div>
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles size={16} />
              AI Powered Resume Analyzer
            </span>

            <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Find Your
              <span className="text-blue-600"> Dream Job </span>
              Faster with AI
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Upload your resume, get AI-powered feedback, discover matching jobs,
              and improve your chances of getting hired.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex items-center gap-2">
                Get Started
                <ArrowRight size={18} />
              </button>

              <button className="border border-slate-300 px-6 py-3 rounded-xl hover:bg-white">
                Explore Jobs
              </button>
            </div>

         
            <div className="mt-12 grid grid-cols-3 gap-5">
              <div className="bg-white rounded-xl shadow p-4 text-center">
                <h2 className="text-2xl font-bold text-blue-600">10K+</h2>
                <p className="text-sm text-slate-500">Resumes</p>
              </div>

              <div className="bg-white rounded-xl shadow p-4 text-center">
                <h2 className="text-2xl font-bold text-blue-600">500+</h2>
                <p className="text-sm text-slate-500">Companies</p>
              </div>

              <div className="bg-white rounded-xl shadow p-4 text-center">
                <h2 className="text-2xl font-bold text-blue-600">95%</h2>
                <p className="text-sm text-slate-500">Match Accuracy</p>
              </div>
            </div>
          </div>

       
          <div className="flex justify-center">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="text-blue-600" size={30} />
                <h2 className="font-bold text-xl">Resume Analysis</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>React.js</span>
                  <span className="text-green-600 font-semibold">✔</span>
                </div>

                <div className="flex justify-between">
                  <span>Node.js</span>
                  <span className="text-green-600 font-semibold">✔</span>
                </div>

                <div className="flex justify-between">
                  <span>MongoDB</span>
                  <span className="text-green-600 font-semibold">✔</span>
                </div>

                <div className="flex justify-between">
                  <span>Express.js</span>
                  <span className="text-green-600 font-semibold">✔</span>
                </div>

                <div className="border-t pt-4 flex justify-between">
                  <span className="font-semibold">AI Score</span>
                  <span className="font-bold text-blue-600">92%</span>
                </div>

                <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                  Analyze Resume
                </button>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Hero;