import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignInUp = () => {
  const [authState, setAuthState] = useState<"magic-link" | "password" | "signup">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleZohoSSO = () => {
    const serverUrl =
      process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:3000";
    window.location.href = `${serverUrl}/auth/zoho`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Local developer credentials auth actions
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12">
      <div className="w-full max-w-[350px] flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {authState === "signup" ? "Create an account" : "Sign in to your account"}
          </h1>
          <p className="text-sm text-zinc-400">
            {authState === "signup"
              ? "Enter your details below to create your account"
              : "Enter your email below to sign in"}
          </p>
        </div>

        {authState === "magic-link" && (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-white">Email</label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 border border-zinc-800 bg-[#09090b] text-white placeholder-zinc-500 rounded-md focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:border-zinc-700"
                />
              </div>

              <Button
                type="submit"
                className="h-10 w-full rounded-md border border-zinc-800 bg-[#09090b] text-white hover:bg-zinc-900 transition-colors font-medium"
              >
                Send me the magic link
              </Button>

              <div className="flex flex-col space-y-3 text-center pt-1">
                <button
                  type="button"
                  onClick={() => setAuthState("password")}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Sign in using password
                </button>
                <p className="text-sm text-zinc-400">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthState("signup")}
                    className="font-medium text-white hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </form>
        )}

        {authState === "password" && (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-white">Email</label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 border border-zinc-800 bg-[#09090b] text-white placeholder-zinc-500 rounded-md focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:border-zinc-700"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-white">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 w-full border border-zinc-800 bg-[#09090b] pr-10 text-white placeholder-zinc-500 rounded-md focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:border-zinc-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white flex items-center"
                  >
                    {showPassword ? (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="h-10 w-full rounded-md border border-zinc-800 bg-[#09090b] text-white hover:bg-zinc-900 transition-colors font-medium"
              >
                Sign In
              </Button>

              <div className="flex flex-col space-y-3 text-center pt-1">
                <button
                  type="button"
                  onClick={() => setAuthState("magic-link")}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Send me a magic link
                </button>
                <p className="text-sm text-zinc-400">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthState("signup")}
                    className="font-medium text-white hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </form>
        )}

        {authState === "signup" && (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4 w-full">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-white">First Name</label>
                  <Input
                    type="text"
                    placeholder="First name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-10 border border-zinc-800 bg-[#09090b] text-white placeholder-zinc-500 rounded-md focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:border-zinc-700"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-white">Last Name</label>
                  <Input
                    type="text"
                    placeholder="Last name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-10 border border-zinc-800 bg-[#09090b] text-white placeholder-zinc-500 rounded-md focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:border-zinc-700"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-white">Email</label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 border border-zinc-800 bg-[#09090b] text-white placeholder-zinc-500 rounded-md focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:border-zinc-700"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-white">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 w-full border border-zinc-800 bg-[#09090b] pr-10 text-white placeholder-zinc-500 rounded-md focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:border-zinc-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white flex items-center"
                  >
                    {showPassword ? (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="h-10 w-full rounded-md border border-zinc-800 bg-[#09090b] text-white hover:bg-zinc-900 transition-colors font-medium"
              >
                Sign up
              </Button>

              <div className="text-center pt-1">
                <p className="text-sm text-zinc-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthState("password")}
                    className="font-medium text-white hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </form>
        )}

        <div className="relative my-4 w-full">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-zinc-500">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleZohoSSO}
          className="h-10 w-full rounded-md border border-zinc-800 bg-transparent text-white hover:bg-zinc-900 transition-colors flex items-center justify-center space-x-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </Button>
      </div>
    </div>
  );
};
