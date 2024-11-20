import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner"; // Import Sonner's toast

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.username || !formData.password) {
      toast.error('Please fill in both username and password');  // Toast error for missing fields
      return;
    }

    // Simulate a successful login
    toast.success('Login successful!');  // Toast success for successful login
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center">
        <img
          alt="Modern armchair with throw blanket"
          src="image.png"
          width={600}
          height={600}
          className="h-auto w-auto max-h-[80%] max-w-[80%] object-cover"
        />
      </div>
      <div className="flex flex-col px-6 lg:px-12">
        <div className="flex flex-col justify-center flex-1 pb-12">
          <div className="mx-auto w-full max-w-[440px] space-y-6">
            <div className="space-y-2 ">
              <h1 className="text-3xl font-bold ">Sign in</h1>
              <p className="text-muted-foreground">
                Don't have an account yet?{" "}
                <Link
                  to="/"
                  className="text-primary hover:underline text-green-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <Label htmlFor="username">Your Username or email address</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm ml-2 font-normal">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/terms"
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
