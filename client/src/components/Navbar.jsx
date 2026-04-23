import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sprout, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="/" className="navbar-brand" onClick={() => setIsMenuOpen(false)}>
          <Sprout size={32} />
          <span>Kheti Buddy</span>
        </NavLink>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop & Mobile Nav */}
        <div className={`navbar-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/recommend" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setIsMenuOpen(false)}>
            Recommendation
          </NavLink>
          <NavLink to="/soil-analysis" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setIsMenuOpen(false)}>
            Soil Analysis
          </NavLink>
          <NavLink to="/price" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setIsMenuOpen(false)}>
            Price Predictor
          </NavLink>
          <NavLink to="/fertilizer" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setIsMenuOpen(false)}>
            Fertilizer
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
