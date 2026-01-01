import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [role, setRole] = useState(localStorage.getItem('userRole') || null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => setRole(localStorage.getItem('userRole') || null);
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setRole(null);
    setMobileMenuOpen(false);
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = (
    <>
      <Link to="/" className="block py-4 px-6 text-white hover:bg-lemongreen-dark rounded-lg transition text-lg" onClick={() => setMobileMenuOpen(false)}>
        Home
      </Link>
      <Link to="/listings" className="block py-4 px-6 text-white hover:bg-lemongreen-dark rounded-lg transition text-lg" onClick={() => setMobileMenuOpen(false)}>
        Listings
      </Link>

      {role === 'agent' && (
        <Link to="/agent-dashboard" className="block py-4 px-6 text-white hover:bg-lemongreen-dark rounded-lg transition text-lg" onClick={() => setMobileMenuOpen(false)}>
          Agent Dashboard
        </Link>
      )}

      {role === 'admin' && (
        <Link to="/admin-dashboard" className="block py-4 px-6 text-white hover:bg-lemongreen-dark rounded-lg transition text-lg" onClick={() => setMobileMenuOpen(false)}>
          Admin Dashboard
        </Link>
      )}

      {!role ? (
        <>
          <Link to="/login" className="block py-4 px-6 text-white hover:bg-lemongreen-dark rounded-lg transition text-lg" onClick={() => setMobileMenuOpen(false)}>
            Login
          </Link>
          <Link
            to="/register"
            className="block py-4 px-6 bg-white text-lemongreen font-bold rounded-lg hover:bg-lemongreen-light hover:text-white transition text-center mx-6 my-4 text-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            Register
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="block w-full text-left py-4 px-6 text-white bg-red-600 hover:bg-red-700 rounded-lg transition text-lg"
        >
          Logout
        </button>
      )}
    </>
  );

  return (
    <header className="bg-lemongreen shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo + Text - Scales on small phones */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img src="/logo.png" alt="HomeMu Logo" className="h-8 sm:h-10 md:h-12 w-auto" />
            <span className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Home<span className="text-lemongreen-light drop-shadow-md">Mu</span>
            </span>
          </Link>

          {/* Desktop: Search + Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Anambra properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-lemongreen-light w-56 lg:w-72"
              />
            </form>

            <nav className="flex items-center gap-6 lg:gap-8">
              {navLinks}
            </nav>
          </div>

          {/* Mobile Hamburger - Larger tap area */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-white p-2"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full screen on small phones */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-full max-w-xs h-full bg-lemongreen shadow-2xl overflow-y-auto">
            <div className="p-6 border-b border-lemongreen-dark">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="HomeMu" className="h-10 w-auto" />
                <span className="text-white text-2xl font-bold">HomeMu</span>
              </div>
            </div>
            <nav className="p-6 space-y-2">
              {navLinks}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;