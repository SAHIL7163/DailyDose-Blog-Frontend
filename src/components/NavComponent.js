import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
// import logo from "./../img/dailydoseblog-high-resolution-logo (3).jpg";

const NavComponent = ({ search, setSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
      document.documentElement.style.setProperty('--bg-primary', '#f8fafc');
      document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
      document.documentElement.style.setProperty('--text-primary', '#0f172a');
      document.documentElement.style.setProperty('--text-secondary', '#475569');
      document.documentElement.style.setProperty('--text-muted', '#64748b');
      document.documentElement.style.setProperty('--border-color', '#e2e8f0');
      document.documentElement.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.85)');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#0f172a');
      document.documentElement.style.setProperty('--bg-secondary', '#1e293b');
      document.documentElement.style.setProperty('--text-primary', '#f8fafc');
      document.documentElement.style.setProperty('--text-secondary', '#cbd5e1');
      document.documentElement.style.setProperty('--text-muted', '#94a3b8');
      document.documentElement.style.setProperty('--border-color', '#334155');
      document.documentElement.style.setProperty('--nav-bg', 'rgba(15, 23, 42, 0.8)');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          {/* <img src={logo} alt="DailyDose Logo" style={{ height: '40px', borderRadius: '50%' }} /> */}
          <span className="text-gradient">DailyDose</span>
        </Link>

        {/* Desktop Search Bar */}
        <form className="search-bar hide-on-mobile" onSubmit={(e) => e.preventDefault()}>
          <FaSearch color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search articles..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        {/* Mobile Menu Toggle */}
        <div className="mobile-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes color="var(--text-primary)" size={24} /> : <FaBars color="var(--text-primary)" size={24} />}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          {/* Theme Switcher Toggle */}
          <li className="nav-item d-flex align-items-center">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost rounded-circle d-flex align-items-center justify-content-center p-2"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              style={{ color: 'var(--text-primary)' }}
            >
              {theme === 'dark' ? (
                <FaSun size={20} className="text-warning" />
              ) : (
                <FaMoon size={20} className="text-primary" />
              )}
            </button>
          </li>
          <li className="nav-item">
            <NavLink to="/" className="nav-link" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/post" className="nav-link" onClick={closeMenu}>
              Post
            </NavLink>
          </li>

          {!auth?.accessToken ? (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" onClick={closeMenu}>
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link" onClick={closeMenu}>
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link" style={{ background: 'none', cursor: 'pointer' }}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Styles Injection (Inline for now or add to CSS) */}
      <style>{`
        .mobile-toggle {
          display: none;
          cursor: pointer;
        }
        .hide-on-mobile {
          display: flex;
        }
        
        @media (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }
          .hide-on-mobile {
            display: none;
          }
          .nav-menu {
            position: fixed;
            top: var(--header-height);
            left: 0;
            right: 0;
            background-color: ${theme === 'dark' ? 'rgba(15, 23, 42, 0.85)' : 'rgba(248, 250, 252, 0.85)'};
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-150%);
            transition: transform 0.3s ease-in-out, background-color 0.3s ease;
            border-bottom: 1px solid var(--border-color);
            z-index: 999;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }
          .nav-menu.active {
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default NavComponent;

