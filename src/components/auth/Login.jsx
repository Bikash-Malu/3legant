import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { toast } from "sonner";
import { useDispatch } from "react-redux"; // Import useDispatch from redux
import { login } from "../redux/authSlice"; // Import login action from your slice
import { TailSpin } from 'react-loader-spinner'; // Import the loader component

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state
  
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error("Please fill in both username and password");
      return;
    }

    setLoading(true); // Start loading

    const user = {
      username: formData.username,
      email: formData.username
    };

    // Simulate the login action
    dispatch(login(user));

    // Simulate a delay for login process
    setTimeout(() => {
      toast.success("Login successful!");
      setLoading(false); // Stop loading after the "login" process is done
      navigate("/"); // Navigate after 2 seconds
    }, 2000);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-white">
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
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <label htmlFor="username" className="text-gray-700">
                  Your Username or Email Address
                </label>
                <input
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
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
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="terms" required />
                  <Label
                    htmlFor="terms"
                    className="text-sm ml-2 font-normal text-gray-700"
                  >
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
              <Button
                type="submit"
                className={`w-full bg-black text-white hover:bg-gray-950 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <TailSpin
                    height="20"
                    width="20"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
