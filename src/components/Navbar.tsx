import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200 shadow-lg">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              ClerkAuth
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <Link
                to="/sign-in"
                className="px-5 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link to="/sign-up" className="btn-primary">
                Get Started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                to="/dashboard"
                className="px-5 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Dashboard
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 rounded-full ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full ring-2 ring-blue-500/20",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-white/50 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </SignedOut>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <SignedOut>
              <div className="flex flex-col space-y-3">
                <Link
                  to="/sign-in"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors rounded-lg hover:bg-white/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="btn-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors rounded-lg hover:bg-white/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </SignedIn>
          </div>
        )}
      </div>
    </nav>
  );
}
