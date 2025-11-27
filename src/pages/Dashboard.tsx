import { useUser } from "@clerk/clerk-react";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            Welcome back,{" "}
            <span className="gradient-text">{user?.firstName || "User"}</span>!
            👋
          </h1>
          <p className="text-xl text-gray-600">
            Here's your personalized dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Stat Card 1 */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Account Status
              </h3>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold gradient-text">Active</p>
            <p className="text-sm text-gray-500 mt-1">
              Your account is verified
            </p>
          </div>

          {/* Stat Card 2 */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Sessions</h3>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold gradient-text">Persistent</p>
            <p className="text-sm text-gray-500 mt-1">Stay logged in forever</p>
          </div>

          {/* Stat Card 3 */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Security</h3>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
            </div>
            <p className="text-3xl font-bold gradient-text">Protected</p>
            <p className="text-sm text-gray-500 mt-1">
              Enterprise-grade security
            </p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6 gradient-text">
            Your Profile
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={user?.imageUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full ring-4 ring-blue-500/20"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.fullName || "User"}
                </p>
                <p className="text-gray-600">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-mono text-sm text-gray-700 break-all">
                  {user?.id}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created At</p>
                <p className="text-sm text-gray-700">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6 gradient-text">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-lg transition-all text-left group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Edit Profile</h3>
              <p className="text-sm text-gray-600 mt-1">
                Update your information
              </p>
            </button>

            <button className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 hover:shadow-lg transition-all text-left group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Settings</h3>
              <p className="text-sm text-gray-600 mt-1">
                Manage your preferences
              </p>
            </button>

            <button className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:shadow-lg transition-all text-left group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Documentation</h3>
              <p className="text-sm text-gray-600 mt-1">
                Learn more about features
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
