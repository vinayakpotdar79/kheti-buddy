import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span className="logo-icon">🌱</span>
        <span className="logo-text">KhetiBuddy</span>
      </div>
      <div className="nav-links">
        <Link to="/predict" className="nav-link">Crop Recommendation</Link>
        <Link to="/price" className="nav-link">Price Prediction</Link>
      </div>
    </nav>
  );
}

export default Navbar;
