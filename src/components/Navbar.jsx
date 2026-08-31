import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Navbar = () => {
  const { user, isAuth, logout } = UserData();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1001] h-16 bg-[var(--surface)] border-b border-[var(--border)] px-6 flex justify-between items-center shadow-sm">
      <Link to="/" className="nav-logo">
        <span className="logo-icon">S</span>
        SportsSquad
      </Link>

      {isAuth && (
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="theme-toggle !w-10 !h-10"
            aria-label="Toggle theme"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          <div className="h-8 w-px bg-[var(--border)] mx-1" />

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{user.name}</p>
              <p className="text-xs text-[var(--text-secondary)] leading-tight">Member</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white text-sm font-medium transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;