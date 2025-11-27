import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text">
            Create Your Account
          </h2>
          <p className="text-gray-600 mt-2">
            Get started with your free account
          </p>
        </div>
        <div className="glass rounded-2xl p-8 shadow-2xl">
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none",
              },
            }}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}
