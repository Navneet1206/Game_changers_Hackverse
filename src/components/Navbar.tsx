import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={closeMobileMenu}
        className={`block px-3 py-2 text-gray-600 hover:text-blue-600 ${
          isActive ? 'text-blue-600 font-medium' : ''
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">HealthHub</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {/* Conditionally hide the Home link when logged in */}
            {!user && <NavLink to="/">Home</NavLink>}
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/hospitals">Find Hospitals</NavLink>
            <NavLink to="/mediclaim">MediClaim</NavLink>
            {user ? (
              <>
                {/* Add a Dashboard link for logged-in users */}
                <NavLink to={`/dashboard/${user.userType.toLowerCase()}`}>
                  Dashboard
                </NavLink>
                <button
                  onClick={signOut}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Conditionally hide the Home link when logged in */}
            {!user && <NavLink to="/">Home</NavLink>}
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/hospitals">Find Hospitals</NavLink>
            <NavLink to="/mediclaim">MediClaim</NavLink>
            {user ? (
              <>
                {/* Add a Dashboard link for logged-in users */}
                <NavLink to={`/dashboard/${user.userType.toLowerCase()}`}>
                  Dashboard
                </NavLink>
                <button
                  onClick={signOut}
                  className="w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;