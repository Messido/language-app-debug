import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Secure Authentication</span>
              <br />
              <span className="text-gray-800">Made Simple</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              A production-ready React starter with Clerk authentication. Build
              secure apps faster with persistent sessions and protected routes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SignedOut>
                <Link to="/sign-up" className="btn-primary text-lg px-8 py-4">
                  Get Started Free
                  <svg
                    className="inline-block ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link to="/sign-in" className="btn-secondary text-lg px-8 py-4">
                  Sign In
                </Link>
              </SignedOut>
              <SignedIn>
                <Link to="/dashboard" className="btn-primary text-lg px-8 py-4">
                  Go to Dashboard
                  <svg
                    className="inline-block ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Everything you need for modern authentication
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card group hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Secure by Default
              </h3>
              <p className="text-gray-600">
                Enterprise-grade security with HTTP-only cookies and automatic
                session management.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card group hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Built with Vite and React for blazing-fast development and
                optimal performance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card group hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Fully Responsive
              </h3>
              <p className="text-gray-600">
                Beautiful UI that works perfectly on mobile, tablet, and desktop
                devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white border-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of developers building secure applications with
              Clerk.
            </p>
            <SignedOut>
              <Link
                to="/sign-up"
                className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
              >
                Create Your Free Account
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                to="/dashboard"
                className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
              >
                View Your Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>
    </div>
  );
}
