import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "../common/Logo";
import Container from "../ui/Container";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Jobs", path: "/seeker/jobs" },
    { name: "Resume", path: "/seeker/resume" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <Container>
        <div className="h-20 flex items-center justify-between">

          <Link to="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-sm font-semibold transition ${
                  location.pathname === link.path
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.name}

                {location.pathname === link.path && (
                  <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-lg border border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-slate-700"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-5 border-t border-slate-100 pt-4">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex gap-3 mt-3">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center border border-blue-600 text-blue-600 py-2.5 rounded-lg"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center bg-blue-600 text-white py-2.5 rounded-lg"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;