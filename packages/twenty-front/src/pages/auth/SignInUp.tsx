import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignInUp = () => {
  const [authState, setAuthState] = useState<"magic-link" | "password" | "signup">("magic-link");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] px-4 py-12">
      <div className="w-full max-w-[440px] rounded-[2.5rem] border border-[#27272a]/30 bg-[#161616] p-10 shadow-2xl">
        <div className="flex flex-col items-center">
          {/* Custom White Spinner Logo */}
          <div className="flex h-12 w-12 items-center justify-center">
            <svg
              className="h-10 w-10 text-white animate-spin-slow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="12" y1="2" x2="12" y2="5" opacity="1.0" />
              <line x1="12" y1="19" x2="12" y2="22" opacity="0.4" />
              <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" opacity="0.9" />
              <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" opacity="0.3" />
              <line x1="2" y1="12" x2="5" y2="12" opacity="0.8" />
              <line x1="19" y1="12" x2="22" y2="12" opacity="0.2" />
              <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" opacity="0.7" />
              <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" opacity="0.1" />
            </svg>
          </div>

          {authState === "magic-link" && (
            <>
              <h2 className="mt-8 text-[32px] font-semibold tracking-tight text-white">
                Welcome back!
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                First time here?{" "}
                <button
                  type="button"
                  onClick={() => setAuthState("signup")}
                  className="font-medium text-white hover:underline"
                >
                  Sign up for free
                </button>
              </p>

              <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
                <Input
                  type="email"
                  placeholder="Your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-xl border-zinc-800 bg-[#222222]/50 px-4 text-white placeholder-zinc-500 focus-visible:ring-zinc-700"
                />

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-zinc-200 font-semibold text-zinc-950 hover:bg-zinc-300"
                >
                  Send me the magic link
                </Button>

                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthState("password")}
                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    Sign in using password
                  </button>
                </div>
              </form>
            </>
          )}

          {authState === "password" && (
            <>
              <h2 className="mt-8 text-[32px] font-semibold tracking-tight text-white">
                Welcome back!
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                First time here?{" "}
                <button
                  type="button"
                  onClick={() => setAuthState("signup")}
                  className="font-medium text-white hover:underline"
                >
                  Sign up for free
                </button>
              </p>

              <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
                <Input
                  type="email"
                  placeholder="Your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-xl border-zinc-800 bg-[#222222]/50 px-4 text-white placeholder-zinc-500 focus-visible:ring-zinc-700"
                />

                <Input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-xl border-zinc-800 bg-[#222222]/50 px-4 text-white placeholder-zinc-500 focus-visible:ring-zinc-700"
                />

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-zinc-200 font-semibold text-zinc-950 hover:bg-zinc-300"
                >
                  Sign in
                </Button>

                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthState("magic-link")}
                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    Send me a magic link
                  </button>
                </div>
              </form>
            </>
          )}

          {authState === "signup" && (
            <>
              <h2 className="mt-8 text-[32px] font-semibold tracking-tight text-white">
                Create account
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthState("magic-link")}
                  className="font-medium text-white hover:underline"
                >
                  Sign in
                </button>
              </p>

              <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="First name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 w-full rounded-xl border-zinc-800 bg-[#222222]/50 px-4 text-white placeholder-zinc-500 focus-visible:ring-zinc-700"
                  />
                  <Input
                    type="text"
                    placeholder="Last name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 w-full rounded-xl border-zinc-800 bg-[#222222]/50 px-4 text-white placeholder-zinc-500 focus-visible:ring-zinc-700"
                  />
                </div>

                <Input
                  type="email"
                  placeholder="Your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-xl border-zinc-800 bg-[#222222]/50 px-4 text-white placeholder-zinc-500 focus-visible:ring-zinc-700"
                />

                <Input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-xl border-zinc-800 bg-[#222222]/50 px-4 text-white placeholder-zinc-500 focus-visible:ring-zinc-700"
                />

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-zinc-200 font-semibold text-zinc-950 hover:bg-zinc-300"
                >
                  Sign up
                </Button>
              </form>
            </>
          )}

          {/* Separator and SSO */}
          <div className="relative my-6 w-full">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#161616] px-3 font-semibold text-zinc-500">
                or
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleZohoSSO}
            className="h-12 w-full rounded-xl border border-zinc-800 bg-transparent font-semibold text-white hover:bg-zinc-900 hover:text-white"
          >
            Single sign-on (SSO)
          </Button>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs leading-relaxed text-zinc-500">
            You acknowledge that you read, and agree, to <br />
            our{" "}
            <a href="#" className="underline hover:text-zinc-400">
              Terms of Service
            </a>{" "}
            and our{" "}
            <a href="#" className="underline hover:text-zinc-400">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
