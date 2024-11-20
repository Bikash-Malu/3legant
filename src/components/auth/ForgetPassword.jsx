
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for email
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Simulate sending the reset link (you can replace this with an API call)
    toast.success("Password reset link sent to your email");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center">
        <img
          alt="Password reset"
          src="image.png" // Placeholder for an image or logo
          width={600}
          height={600}
          className="h-auto w-auto max-h-[80%] max-w-[80%] object-cover"
        />
      </div>
      <div className="flex flex-col px-6 lg:px-12">
        <div className="flex flex-col justify-center flex-1 pb-12">
          <div className="mx-auto w-full max-w-[440px] space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-muted-foreground">
                Enter your email address, and we'll send you a link to reset your password.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/login" className="text-primary text-sm font-semibold hover:underline">
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
