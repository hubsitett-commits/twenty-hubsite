import * as React from "react";
import { useState } from "react";
import {
  IconUser,
  IconCode,
  IconChartBar,
  IconEye,
  IconEyeOff,
  IconKey,
  IconChevronDown,
  IconCheck,
} from "twenty-ui/icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const SignInUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleZohoSSO = () => {
    // Redirect directly to backend Zoho SSO initiation route
    const serverUrl =
      process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:3000";
    window.location.href = `${serverUrl}/auth/zoho`;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Local developer credentials login action
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Local developer credentials signup action
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <IconChartBar className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Twenty Monorepo
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            A secure open-source CRM architecture
          </p>
        </div>

        {isLogin ? (
          <Card className="border-slate-200/80 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Sign in
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Choose your preferred login method below
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  onClick={handleZohoSSO}
                  className="flex w-full items-center justify-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <IconChevronDown className="h-4 w-4 text-primary" />
                  <span>Single sign-on (SSO) with Zoho</span>
                </Button>
              </div>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                    or continue with
                  </span>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <IconUser className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <IconKey className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-10 border-slate-200 dark:border-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? (
                        <IconEyeOff className="h-4 w-4" />
                      ) : (
                        <IconEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 text-center">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                New to Twenty?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Create an account
                </button>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-slate-200/80 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Create an account
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Register a new corporate identity profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Jane"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="border-slate-200 dark:border-slate-800"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <IconUser className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane.doe@company.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <IconKey className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-10 border-slate-200 dark:border-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <IconEyeOff className="h-4 w-4" />
                      ) : (
                        <IconEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <IconKey className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-9 pr-10 border-slate-200 dark:border-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? (
                        <IconEyeOff className="h-4 w-4" />
                      ) : (
                        <IconEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) =>
                      setTermsAccepted(checked === true)
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"
                  >
                    I agree to the terms and conditions
                    <IconCheck className="h-3 w-3 text-success" />
                  </Label>
                </div>

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 text-center">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Sign in
                </button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};
