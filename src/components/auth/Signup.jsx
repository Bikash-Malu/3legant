import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner"; // Import Sonner's toast

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.termsAccepted
    ) {
      toast.error("Please fill all the required fields.");
      return;
    }

    // Successful submission message
    toast.success("You have signed up successfully!");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:block">
        <img
          src="https://s3-alpha-sig.figma.com/img/2c01/ae8d/ce147d8554c2cda7530244569e9d8515?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZTVk8XaFUn5YeusZhWHFrXaLHg6jJAaH-Hw0JQcNJ~CTKyLcs5Hf3TKongBE9rFxZTloQt-fk2V8egyOvRMFJGLQwrQ3Fo0UWwVp6LY663DOnzQLWb6VsWuHCrU~DaP-wly1b7GGxidBf~OVYuf0h7WckRDAHfbCtcJihwPH3HvsWQWdQF7WePiGLsh0Z4PQGvrOW4rbQ0f~6MrkJWPSGsP6Fg4qR2xGgSKeZ16oWjQgmE8fctE10lz0kMHsloA3~w6snuBY6yNbkihzpy5Nu71cMCizFrpx-jZxgZfrL3hZtw3t0KdMS9Db-vqWSo-~iQY7Lf7W~9TdLEpX94NNJA__"
          alt="Modern armchair with throw blanket"
          width={800}
          height={800}
          className="h-full w-full object-contain"
          priority
        />
      </div>
      <div className="flex flex-col px-6 lg:px-12">
        <div className="flex flex-col justify-center flex-1 pb-12">
          <div className="mx-auto w-full max-w-[440px] space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold ">Sign up</h1>
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline text-green-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  placeholder="Email address"
                  type="email"
                  value={formData.email}
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
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="terms" className="text-sm leading-none">
                  I agree with{" "}
                  <Link
                    to="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Use
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
