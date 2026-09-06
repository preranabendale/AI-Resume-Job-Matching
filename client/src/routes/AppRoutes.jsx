import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import NotFound from "../pages/public/NotFound";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Seeker Pages
import Resume from "../pages/seeker/Resume";
import AIAnalysis from "../pages/seeker/AIAnalysis";
import Jobs from "../pages/seeker/jobs";
import Dashboard from "../pages/seeker/Dashboard";


import PostJob from "../pages/recruiter/PostJob";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
       {/* Dashboard */}
       <Route path="/dashboard" element={<Dashboard />} />
      
      <Route path="/recruiter/post-job" element={<PostJob />} />
      
      {/* Seeker Routes */}
      <Route path="/seeker/resume" element={<Resume />} />
      <Route path="/seeker/ai-analysis" element={<AIAnalysis />} />
      <Route path="/seeker/jobs" element={<Jobs />} />
      

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;