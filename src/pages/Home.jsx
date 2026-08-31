/**
 * ============================================================
 *  Home.jsx — SportsSquad Landing Page
 * ============================================================
 *  This is the public homepage shown to unauthenticated users.
 *  It contains seven sections:
 *    1. Navbar (sticky, glassmorphism, scroll-aware)
 *    2. Hero (3D basketball + CTA)
 *    3. Features (4 cards)
 *    4. How It Works (4-step timeline)
 *    5. Pricing (3-tier cards)
 *    6. CTA banner
 *    7. Footer
 *
 *  Key behaviours:
 *    - Dark/Light mode toggle (class-based strategy on <html>)
 *    - Smooth scroll navigation via anchor links
 *    - Intersection Observer for scroll-reveal animations
 *    - Pure CSS/SVG 3D basketball that rotates on hover
 * ============================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/* ================================================================
   1. SVG ICON COMPONENTS
   ================================================================
   Small, self-contained SVG icons used across the page.
   Using inline SVGs instead of an icon library keeps the
   bundle size small and avoids an extra dependency.
   ================================================================ */

/** Sun icon — shown in dark mode to switch to light mode */
const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

/** Moon icon — shown in light mode to switch to dark mode */
const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/** Hamburger menu icon — for mobile navigation */
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

/** Close (X) icon — to close the mobile menu */
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/** Right arrow icon — used inside CTA buttons */
const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/** Checkmark icon — used in pricing feature lists */
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ================================================================
   2. FEATURE SECTION ICONS
   ================================================================
   Larger icons used inside the feature cards.
   Each represents a core product capability.
   ================================================================ */

/** Calendar icon — represents "Event Creation" feature */
const CalendarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/** Users icon — represents "Team Registration" feature */
const UsersIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/** Clipboard icon — represents "Match Scheduling" feature */
const ClipboardIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

/** Trophy icon — represents "Live Score Tracking" feature */
const TrophyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 19.24 7 20h10c0-.76-.85-1.25-2.03-1.79C14.47 17.98 14 17.55 14 17v-2.34" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

/* ================================================================
   3. SOCIAL MEDIA ICONS (Footer)
   ================================================================ */

/** X / Twitter icon */
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/** GitHub icon */
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

/** LinkedIn icon */
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);



/* ================================================================
   5. SCROLL REVEAL CUSTOM HOOK
   ================================================================
   Uses the Intersection Observer API to add a `.visible` class
   to elements with the `.reveal` class when they scroll into view.
   This triggers the CSS fade-in / slide-up animation defined
   in index.css under `.reveal` and `.reveal.visible`.
   ================================================================ */
const useScrollReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    // Create an observer that watches for elements entering the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add "visible" class to trigger the CSS animation
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,                       // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px',      // Slightly offset from the bottom
      }
    );

    // Observe all elements with the `.reveal` class inside our ref
    const elements = ref.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect();
  }, []);

  return ref;
};

/* ================================================================
   6. HOME PAGE COMPONENT (Main Export)
   ================================================================
   This is the primary landing page component. It manages:
     - Dark mode state (stored in useState, toggled on <html>)
     - Scroll state (to change navbar appearance)
     - Mobile menu open/close state
     - Smooth scrolling to sections via `scrollTo` helper
   ================================================================ */
const Home = () => {
  /* ── State ── */
  const { darkMode, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);         // Has the user scrolled past 50px?
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile hamburger menu state

  // Attach scroll-reveal observer to the page container
  const pageRef = useScrollReveal();

  /* ── Effect: Listen for scroll to update navbar style ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * scrollTo — Smooth-scrolls to a section by its DOM id.
   * Also closes the mobile menu if it's open.
   * @param {string} id — The id attribute of the target section
   */
  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── Render ── */
  return (
    <div ref={pageRef}>

      {/* ════════════════════════════════════════════
          SECTION 1: NAVBAR
          ════════════════════════════════════════════
          - Sticky at the top of the page
          - Transparent initially; gains a frosted-glass
            background after scrolling 50px (via .scrolled)
          - Contains: Logo, nav links, theme toggle,
            Login/SignUp buttons, mobile menu toggle
      */}
      <nav className={`home-navbar ${scrolled ? 'scrolled' : ''}`} id="home-nav">
        {/* Logo — scrolls to hero on click */}
        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
          <span className="logo-icon">S</span>
          SportsSquad
        </a>

        {/* Navigation links — smooth scroll to each section */}
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>Home</a></li>
          <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}>Features</a></li>
          <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}>How It Works</a></li>
          <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}>Pricing</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
        </ul>

        {/* Right-side actions */}
        <div className="nav-actions">
          {/* Dark / Light mode toggle button */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            id="theme-toggle"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Auth buttons — navigate to login/register pages */}
          <Link to="/login" className="btn-login" id="nav-login-btn">Log In</Link>
          <Link to="/register" className="btn-signup" id="nav-signup-btn">Sign Up</Link>

          {/* Mobile hamburger / close menu toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* ════════════════════════════════════════════
          SECTION 2: HERO
          ════════════════════════════════════════════
          - Centered hero layout focusing on clear value proposition and key metrics
          - Background: decorative subtle blurred shapes
      */}
      <section className="hero-section" id="hero">
        {/* Decorative floating blurred shapes in the background */}
        <div className="hero-shape hero-shape-1" />
        <div className="hero-shape hero-shape-2" />
        <div className="hero-shape hero-shape-3" />

        <div className="hero-container centered">
          {/* ── Centered hero content ── */}
          <div className="hero-content">
            {/* Beta badge with animated green dot */}
            <div className="hero-badge">
              <span className="badge-dot" />
              Now in Public Beta
            </div>

            {/* Main headline */}
            <h1 className="hero-title">
              Manage Sports Events{' '}
              <span className="highlight">Smarter</span>
            </h1>

            {/* Subtitle describing the product */}
            <p className="hero-subtitle">
              From registrations to live scoring — organize, schedule, and track
              your sports events all in one powerful platform.
            </p>

            {/* Call-to-action buttons */}
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary" id="hero-get-started">
                Get Started <ArrowRightIcon />
              </Link>
              <a
                href="#features"
                className="btn-secondary"
                onClick={(e) => { e.preventDefault(); scrollTo('features'); }}
                id="hero-explore-features"
              >
                Explore Features
              </a>
            </div>

            {/* Social proof stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Events Hosted</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2K+</div>
                <div className="stat-label">Teams Registered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Players Active</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3: FEATURES
          ════════════════════════════════════════════
          Four feature cards in a responsive grid.
          Each card lifts on hover with a top-border reveal.
      */}
      <section className="section" id="features">
        {/* Section header: tag, title, subtitle */}
        <div className="section-header reveal">
          <span className="section-tag">⚡ Features</span>
          <h2 className="section-title">Everything You Need to Run Events</h2>
          <p className="section-subtitle">
            Powerful tools designed to simplify every aspect of sports event management.
          </p>
        </div>

        {/* Feature cards grid — 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="features-grid">
          {/* Card 1: Event Creation */}
          <div className="feature-card reveal">
            <div className="feature-icon blue"><CalendarIcon /></div>
            <h3>Event Creation</h3>
            <p>Create and customize events in minutes with flexible settings for dates, rules, and categories.</p>
          </div>

          {/* Card 2: Team Registration */}
          <div className="feature-card reveal">
            <div className="feature-icon green"><UsersIcon /></div>
            <h3>Team Registration</h3>
            <p>Seamless team sign-ups with roster management, automatic confirmations, and waitlists.</p>
          </div>

          {/* Card 3: Match Scheduling */}
          <div className="feature-card reveal">
            <div className="feature-icon purple"><ClipboardIcon /></div>
            <h3>Match Scheduling</h3>
            <p>Auto-generate brackets and schedules. Round-robin, single elimination, or custom formats.</p>
          </div>

          {/* Card 4: Live Score Tracking */}
          <div className="feature-card reveal">
            <div className="feature-icon orange"><TrophyIcon /></div>
            <h3>Live Score Tracking</h3>
            <p>Real-time score updates, standings, and leaderboards accessible to all participants.</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4: HOW IT WORKS
          ════════════════════════════════════════════
          A 4-step timeline with numbered circles,
          icons, and short descriptions.
          A horizontal connector line runs between steps.
      */}
      <section className="section" id="how-it-works">
        <div className="section-header reveal">
          <span className="section-tag">🔄 How It Works</span>
          <h2 className="section-title">Get Started in 4 Simple Steps</h2>
          <p className="section-subtitle">
            From setup to scoreboards, we've streamlined the entire process.
          </p>
        </div>

        {/* Steps grid — 4 columns with a CSS connector line */}
        <div className="steps-container">
          {/* Step 1 */}
          <div className="step-card reveal">
            <div className="step-number active">1</div>
            <div className="step-icon-circle">🏟️</div>
            <h3>Create Event</h3>
            <p>Set up your tournament with all the details — sport, date, location, and rules.</p>
          </div>

          {/* Step 2 */}
          <div className="step-card reveal">
            <div className="step-number inactive">2</div>
            <div className="step-icon-circle">📨</div>
            <h3>Invite Teams</h3>
            <p>Share your event link and let teams register with their rosters seamlessly.</p>
          </div>

          {/* Step 3 */}
          <div className="step-card reveal">
            <div className="step-number inactive">3</div>
            <div className="step-icon-circle">📅</div>
            <h3>Schedule Matches</h3>
            <p>Auto-generate or manually create match schedules that work for everyone.</p>
          </div>

          {/* Step 4 */}
          <div className="step-card reveal">
            <div className="step-number inactive">4</div>
            <div className="step-icon-circle">🏆</div>
            <h3>Track Results</h3>
            <p>Record scores live, update standings, and celebrate the champions.</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 5: PRICING
          ════════════════════════════════════════════
          Three pricing tiers: Free, Pro (featured), Organizer.
          The "Pro" card is visually highlighted with a border,
          badge, and slight scale-up.
      */}
      <section className="pricing-section" id="pricing">
        <div className="section" style={{ padding: '4rem 1.5rem' }}>
          <div className="section-header reveal">
            <span className="section-tag">💰 Pricing</span>
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">
              Start free and scale as your events grow. No hidden fees.
            </p>
          </div>

          <div className="pricing-grid">
            {/* ── Free Tier ── */}
            <div className="pricing-card reveal">
              <div className="plan-name">Free</div>
              <div className="plan-price">$0<span>/mo</span></div>
              <div className="plan-desc">Perfect for getting started</div>
              <ul className="pricing-features">
                <li><span className="check"><CheckIcon /></span> Up to 3 events</li>
                <li><span className="check"><CheckIcon /></span> 10 teams per event</li>
                <li><span className="check"><CheckIcon /></span> Basic scheduling</li>
                <li><span className="check"><CheckIcon /></span> Score tracking</li>
              </ul>
              <button className="pricing-btn outline">Get Started</button>
            </div>

            {/* ── Pro Tier (Featured / highlighted) ── */}
            <div className="pricing-card featured reveal">
              <div className="pricing-badge">Most Popular</div>
              <div className="plan-name">Pro</div>
              <div className="plan-price">$19<span>/mo</span></div>
              <div className="plan-desc">Best for regular organizers</div>
              <ul className="pricing-features">
                <li><span className="check"><CheckIcon /></span> Unlimited events</li>
                <li><span className="check"><CheckIcon /></span> 50 teams per event</li>
                <li><span className="check"><CheckIcon /></span> Auto bracket generation</li>
                <li><span className="check"><CheckIcon /></span> Live score updates</li>
                <li><span className="check"><CheckIcon /></span> Priority support</li>
              </ul>
              <button className="pricing-btn filled">Get Started</button>
            </div>

            {/* ── Organizer Tier ── */}
            <div className="pricing-card reveal">
              <div className="plan-name">Organizer</div>
              <div className="plan-price">$49<span>/mo</span></div>
              <div className="plan-desc">For large-scale tournaments</div>
              <ul className="pricing-features">
                <li><span className="check"><CheckIcon /></span> Everything in Pro</li>
                <li><span className="check"><CheckIcon /></span> Unlimited teams</li>
                <li><span className="check"><CheckIcon /></span> Custom branding</li>
                <li><span className="check"><CheckIcon /></span> API access</li>
                <li><span className="check"><CheckIcon /></span> Dedicated support</li>
              </ul>
              <button className="pricing-btn outline">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 6: CTA BANNER
          ════════════════════════════════════════════
          A gradient banner encouraging sign-up,
          with decorative blurred circles in the background.
      */}
      <section className="cta-section" id="contact">
        <div className="cta-container reveal">
          <h2>Ready to organize your next event?</h2>
          <p>Join thousands of organizers who trust SportsSquad to run their tournaments.</p>
          <Link to="/register" className="cta-btn" id="cta-get-started">
            Get Started Now <ArrowRightIcon />
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 7: FOOTER
          ════════════════════════════════════════════
          Multi-column footer with brand, product links,
          company links, legal links, and social icons.
      */}
      <footer className="home-footer">
        <div className="footer-inner">
          {/* Brand column — logo, description, social links */}
          <div className="footer-brand">
            <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
              <span className="logo-icon">S</span>
              SportsSquad
            </a>
            <p>
              The all-in-one platform for organizing and managing sports events.
              From local tournaments to league-wide competitions.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter"><TwitterIcon /></a>
              <a href="#" aria-label="GitHub"><GithubIcon /></a>
              <a href="#" aria-label="LinkedIn"><LinkedinIcon /></a>
            </div>
          </div>

          {/* Product links column */}
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}>Features</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}>Pricing</a></li>
              <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}>How It Works</a></li>
            </ul>
          </div>

          {/* Company links column */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          {/* Legal links column */}
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="footer-bottom">
          © {new Date().getFullYear()} SportsSquad. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
