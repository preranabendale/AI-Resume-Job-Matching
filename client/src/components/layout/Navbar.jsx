
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

import Logo from "../common/Logo";
import Container from "../ui/Container";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // Check login status
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data");
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `transition font-medium ${
      isActive
        ? "text-blue-600"
        : "text-slate-600 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">

      <Container>

        <div className="flex items-center justify-between h-20">

          {/* ================= LOGO ================= */}

          <Link to="/" className="flex items-center">
            <Logo />
          </Link>


          {/* ================= NAVIGATION ================= */}

          <nav className="hidden md:flex items-center gap-8">

            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>

            <NavLink to="/seeker/jobs" className={navLinkClass}>
              Jobs
            </NavLink>

          </nav>


          {/* ================= RIGHT SIDE ================= */}

          {!user ? (

            /* ---------- LOGGED OUT ---------- */

            <div className="flex items-center gap-3">

              <Link
                to="/login"
                className="px-5 py-2.5 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-600/20"
              >
                Register
              </Link>

            </div>

          ) : (

            /* ---------- LOGGED IN ---------- */

            <div className="flex items-center gap-3">

              {/* Dashboard */}

              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 font-semibold transition"
              >
                <FaTachometerAlt />

                Dashboard
              </Link>


              {/* User */}

              <div className="hidden sm:flex items-center gap-2">

                <FaUserCircle
                  className="text-2xl text-blue-600"
                />

                <div className="leading-tight">

                  <p className="text-sm font-semibold text-slate-800">
                    {user.fullName || "User"}
                  </p>

                  <p className="text-xs text-slate-500 capitalize">
                    {user.role || "seeker"}
                  </p>

                </div>

              </div>


              {/* Logout */}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition"
              >
                <FaSignOutAlt />

                <span className="hidden sm:inline">
                  Logout
                </span>
              </button>

            </div>

          )}

        </div>

      </Container>

    </header>
  );
};

export default Navbar;

