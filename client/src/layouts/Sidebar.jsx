import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaRobot,
  FaBriefcase,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-72 bg-gradient-to-b from-indigo-700 to-blue-700 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        AI Resume
      </h1>

      <nav className="space-y-4">

        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-blue-700"
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/resume"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-blue-700"
        >
          <FaFileAlt />
          Resume
        </NavLink>

        <NavLink
          to="/ai-analysis"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-blue-700"
        >
          <FaRobot />
          AI Analysis
        </NavLink>

        <NavLink
          to="/jobs"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-blue-700"
        >
          <FaBriefcase />
          Jobs
        </NavLink>

        <NavLink
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-blue-700"
        >
          <FaUser />
          Profile
        </NavLink>

        <NavLink
          to="/login"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500"
        >
          <FaSignOutAlt />
          Logout
        </NavLink>

      </nav>
    </aside>
  );
}

export default Sidebar;