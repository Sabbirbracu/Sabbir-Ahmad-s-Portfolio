"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useResetPasswordMutation } from "@/store/api/apiSlice";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, CheckCircle, Lock } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const MIN_LENGTH = 8; // matches the Admin model

const ResetPassword = () => {
  const token = useSearchParams().get("token") ?? "";
  const { toast } = useToast();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < MIN_LENGTH) return setError(`Password must be at least ${MIN_LENGTH} characters`);
    if (password !== confirm) return setError("Passwords don't match");

    try {
      await resetPassword({ token, password }).unwrap();
      setDone(true);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message;
      setError(message || "Unable to reset password. Please try again.");
      toast({ title: "Reset failed", description: message || "Please request a new link.", variant: "destructive" });
    }
  };

  // The link is single-use and expires, so "invalid" and "no token" both point to requesting a new one.
  const requestNewLink = (
    <Button asChild variant="outline" className="w-full">
      <Link href="/admin/forgot-password">Request a new link</Link>
    </Button>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        <Card className="border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl">
          {done ? (
            <>
              <CardHeader className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-2xl flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <CardTitle className="text-2xl font-bold">Password updated</CardTitle>
                <CardDescription>You can now sign in with your new password.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin/login">Go to login</Link>
                </Button>
              </CardContent>
            </>
          ) : !token ? (
            <>
              <CardHeader className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-2xl flex items-center justify-center mb-2">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <CardTitle className="text-2xl font-bold">Invalid reset link</CardTitle>
                <CardDescription>This link is missing its token. Use the link from your email, or request a new one.</CardDescription>
              </CardHeader>
              <CardContent>{requestNewLink}</CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Choose a new password</CardTitle>
                <CardDescription>At least {MIN_LENGTH} characters.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="password">New password</Label>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">Confirm password</Label>
                    <Input
                      id="confirm"
                      type="password"
                      autoComplete="new-password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-sm text-destructive">
                      {error}
                    </p>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Updating…" : "Update password"}
                  </Button>

                  {error.toLowerCase().includes("invalid or has expired") && requestNewLink}
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
