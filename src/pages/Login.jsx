import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserData } from '../context/UserContext';
import { LoadingAnimation } from '../components/Loading';
import { useTheme } from '../context/ThemeContext';

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { loginUser, btnLoading } = UserData();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validate()) return;
    loginUser(email, password, navigate);
  };

  const handleGoogleLogin = () => {
    toast('Google login is coming soon!', {
      icon: '🔒',
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toast("Password reset link will be sent to your email.", {
      icon: '📧',
    });
  };

  return (
    <div className="auth-page-container">
      {/* Background ambient shapes */}
      <div className="hero-shape hero-shape-1" />
      <div className="hero-shape hero-shape-2" />
      <div className="hero-shape hero-shape-3" />

      {/* Top Navigation Bar: Brand Logo on Left, Theme Toggle on Right */}
      <div className="absolute top-6 left-6 z-20">
        <Link to="/" className="nav-logo !text-base font-bold flex items-center gap-2 group" id="auth-logo">
          <span className="logo-icon !w-8 !h-8 !text-xs !rounded-lg shadow-sm">S</span>
          <span className="text-base font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
            SportsSquad
          </span>
        </Link>
      </div>

      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      {/* Card Wrapper matching shadcn/ui pattern */}
      <div className="flex flex-col gap-6 w-full max-w-sm sm:max-w-md mx-auto z-10 px-4">
        <div className="auth-card">
          {/* Card Header */}
          <div className="text-center mt-3 flex flex-col gap-1">
            <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              Welcome back
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Login with your Google account
            </p>
          </div>

          {/* Card Content & Form */}
          <form onSubmit={submitHandler} noValidate className="flex flex-col gap-4">
            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="google-signup-btn"
            >
              <GoogleIcon />
              <span>Login with Google</span>
            </button>

            {/* Separator */}
            <div className="auth-separator">
              <span>Or continue with</span>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                className={`auth-input ${emailError ? 'auth-input-error' : ''}`}
                placeholder="m@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                required
              />
              {emailError && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                  <span>⚠️</span> {emailError}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]"
                >
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={handleForgotPassword}
                  className="text-xs text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="auth-input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  className={`auth-input pr-10 ${passwordError ? 'auth-input-error' : ''}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                  <span>⚠️</span> {passwordError}
                </p>
              )}
            </div>

            {/* Submit Button & Prompt */}
            <div className="flex flex-col gap-3 mt-2">
              <button
                type="submit"
                className="auth-submit-btn"
                disabled={btnLoading}
              >
                {btnLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingAnimation /> Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>

              <div className="text-center text-sm text-[var(--text-secondary)]">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-[var(--primary)] hover:underline ml-1"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Disclaimer */}
        <p className="px-6 text-center text-xs text-[var(--text-secondary)]">
          By clicking continue, you agree to our{' '}
          <a href="#terms" className="underline underline-offset-4 hover:text-[var(--text-primary)] transition-colors">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#privacy" className="underline underline-offset-4 hover:text-[var(--text-primary)] transition-colors">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Login;