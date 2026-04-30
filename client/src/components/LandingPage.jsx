import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ScanLine, TrendingUp, FlaskConical, ArrowRight, CheckCircle2, Thermometer, Droplets, MessageCircle } from 'lucide-react';
import farmImg from '../assets/farm.png';
import boyfImg from '../assets/boyf.png';
import VariableProximity from './VariableProximity';

const features = [
  {
    icon: Sprout,
    badge: 'AI ANALYSIS',
    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    title: 'Crop Recommendation',
    description: 'Enter your soil NPK levels and location to get an instant AI-powered recommendation for the most profitable crop to grow.',
    link: '/recommend',
    linkLabel: 'Get Recommendation',
    gradient: 'from-emerald-500/10 to-teal-500/5',
    glowColor: 'rgba(52, 211, 153, 0.15)',
  },
  {
    icon: ScanLine,
    badge: 'SCANNER',
    badgeColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    title: 'Soil Report Analyzer',
    description: 'Upload your soil test report (image or PDF) and our AI will automatically extract NPK & pH values, then suggest the best crop.',
    link: '/soil-analysis',
    linkLabel: 'Analyze Report',
    gradient: 'from-cyan-500/10 to-sky-500/5',
    glowColor: 'rgba(34, 211, 238, 0.15)',
  },
  {
    icon: TrendingUp,
    badge: 'MARKET TRENDS',
    badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    title: 'Price Predictor',
    description: 'Forecast the expected market price for any crop in your district — powered by historical data and trend analysis.',
    link: '/price',
    linkLabel: 'Predict Price',
    gradient: 'from-amber-500/10 to-orange-500/5',
    glowColor: 'rgba(251, 191, 36, 0.15)',
  },
  {
    icon: FlaskConical,
    badge: 'NUTRIENT OPTIMIZER',
    badgeColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    title: 'Fertilizer Guidance',
    description: 'Input your crop and current soil nutrient levels to receive a precise, step-by-step fertilizer application plan.',
    link: '/fertilizer',
    linkLabel: 'Get Guidance',
    gradient: 'from-purple-500/10 to-violet-500/5',
    glowColor: 'rgba(167, 139, 250, 0.15)',
  },
];

const whyPoints = [
  'ML model trained on 2200+ soil & climate datasets',
  'Live weather integration via OpenWeatherMap API',
  'Covers 36 states and 500+ districts across India',
  'PDF & image soil report scanning with AI extraction',
];

const LandingPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="hero-section" ref={containerRef}>
        {/* Ambient glow blobs */}
        <div className="hero-blob hero-blob-left" />
        <div className="hero-blob hero-blob-right" />
        {/* Dot grid */}
        <div className="hero-grid" />

        <div className="hero-inner container">
          <div className="hero-content">
            {/* Badge */}
            <div className="hero-badge-wrap">
              <span className="hero-badge">
                <span className="hero-badge-dot" />
                ML-Powered Precision Farming
              </span>
            </div>

            {/* Heading */}
            <h1 className="hero-heading" style={{ position: 'relative' }}>
              <VariableProximity
                label={'Smart'}
                fromFontVariationSettings="'wght' 800, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={200}
                falloff="linear"
              />{' '}
              <VariableProximity
                label={'Agriculture'}
                fromFontVariationSettings="'wght' 800, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={200}
                falloff="linear"
                className="hero-highlight"
              />
              <br />
              <VariableProximity
                label={'Decision Platform'}
                fromFontVariationSettings="'wght' 800, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={200}
                falloff="linear"
              />
            </h1>

            <p className="hero-subtext">
              Harness the power of AI/ML, live weather, and soil science to maximise your harvest — tailored for Indian farmers.
            </p>

            {/* CTAs */}
            <div className="hero-ctas">
              <Link to="/recommend" className="hero-btn-primary">
                <Sprout size={20} /> Start Free Analysis <ArrowRight size={18} />
              </Link>
              <Link to="/soil-analysis" className="hero-btn-secondary">
                <ScanLine size={20} /> Scan Soil Report
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">22+</span>
                <span className="hero-stat-label">Crop Types</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">36</span>
                <span className="hero-stat-label">States Covered</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">~94%</span>
                <span className="hero-stat-label">Model Accuracy for price prediction</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">~99%</span>
                <span className="hero-stat-label">Model Accuracy for crop recommendation</span>

              </div>
            </div>
          </div>

          <div className="hero-visual-main">
            <div className="hero-boy-wrap reveal-right">
              <div className="hero-boy-container">
                <img src={boyfImg} alt="Kheti Buddy Boy" className="boy-img" />
                <div className="speech-bubble">
                  "Tell me your soil— I'll find your best crop!"
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────── */}
      <section className="features-section container">
        <div className="section-label reveal">
          <span className="section-tag">WHAT WE OFFER</span>
          <h2 className="section-title">Four Tools. One Platform.</h2>
          <p className="section-subtitle">Everything you need to make data-driven farming decisions, powered by machine learning.</p>
        </div>

        <div className="features-grid">
          {features.map(({ icon: Icon, badge, badgeColor, title, description, link, linkLabel, gradient, glowColor }, index) => (
            <div
              key={link}
              className={`feature-card reveal delay-${(index % 4) + 1}`}
              style={{ '--glow': glowColor }}
            >
              <div className={`feature-card-bg bg-gradient-to-br ${gradient}`} />
              <div className="feature-card-body">
                <span className={`feature-badge border ${badgeColor}`}>
                  <Icon size={12} /> {badge}
                </span>
                <h3 className="feature-title">{title}</h3>
                <p className="feature-desc">{description}</p>
                <Link to={link} className="feature-link">
                  {linkLabel} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MID-VISUAL (FARM) ─────────────────────────────── */}
      <section className="mid-visual-section container reveal">
        <div className="hero-visual-main mid-farm-visual">
          <div className="hero-3d-wrap">
            <div className="hero-3d-model">
              <img src={farmImg} alt="Smart Farm" className="farm-model-img" />

              {/* Floating data points (keeping everything same as requested) */}
              <div className="floating-point p1">
                <Thermometer size={14} /> 24°C
              </div>
              <div className="floating-point p2">
                <Droplets size={14} /> 65%
              </div>
              <div className="floating-point p3">
                <Sprout size={14} /> Healthy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY KHETI BUDDY ──────────────────────────────────── */}
      <section className="why-section">
        <div className="why-inner container">
          <div className="why-text reveal-left">
            <span className="section-tag">WHY KHETI BUDDY</span>
            <h2 className="section-title">Built for the Indian Farmer</h2>
            <p className="section-subtitle" style={{ maxWidth: '480px' }}>
              We combine cutting-edge ML models with real-time environmental data to give you actionable, localised insights — not generic advice.
            </p>
            <ul className="why-list">
              {whyPoints.map((pt) => (
                <li key={pt} className="why-item">
                  <CheckCircle2 size={18} className="why-icon" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <Link to="/recommend" className="hero-btn-primary why-cta">
              Try It Now <ArrowRight size={18} />
            </Link>
          </div>

          <div className="why-visual reveal-right">
            <div className="why-card glass-panel">
              <div className="why-card-header">
                <span className="section-tag" style={{ color: 'var(--primary)', marginBottom: 0 }}>LIVE PREDICTION</span>
              </div>
              <div className="why-card-crop">
                <Sprout size={48} style={{ color: 'var(--primary)' }} />
                <span className="why-card-crop-name">Wheat</span>
                <span className="why-card-crop-label">Recommended Crop</span>
              </div>
              <div className="why-card-stats">
                {[['N', '82', 'Nitrogen'], ['P', '43', 'Phosphorus'], ['K', '31', 'Potassium']].map(([k, v, label]) => (
                  <div key={k} className="why-card-stat">
                    <span className="why-card-stat-key">{k}</span>
                    <span className="why-card-stat-val">{v}</span>
                    <span className="why-card-stat-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
