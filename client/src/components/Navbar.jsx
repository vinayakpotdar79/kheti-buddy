import { NavLink } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Leaf className="text-primary" size={28} color="var(--primary)" />
          <span>Kheti Buddy</span>
        </div>
        <div className="navbar-nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            end
          >
            Recommendation
          </NavLink>
          <NavLink
            to="/price"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Price Predictor
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
