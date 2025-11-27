import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to access your dashboard</p>
        </div>
        <div className="glass rounded-2xl p-8 shadow-2xl">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none",
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}
