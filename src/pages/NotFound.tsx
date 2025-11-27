import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-9xl font-bold gradient-text">404</h1>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary text-lg">
          <svg
            className="inline-block mr-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
