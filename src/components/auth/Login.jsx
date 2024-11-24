import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { TailSpin } from "react-loader-spinner";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false, 
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("credentials"));
    if (savedCredentials) {
      setFormData({
        ...formData,
        username: savedCredentials.username,
        password: savedCredentials.password,
        rememberMe: true,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!usernameRegex.test(formData.username)) {
      toast.error("Username must be alphanumeric and 3-20 characters long.");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 8 characters long and include one number and one special character.");
      return;
    }

    setLoading(true);
    NProgress.configure({ showSpinner: false });
    NProgress.start();

    const user = {
      username: formData.username,
      email: formData.email,
    };
    if (formData.rememberMe) {
      localStorage.setItem(
        "credentials",
        JSON.stringify({
          username: formData.username,
          password: formData.password,
        })
      );
    } else {
      localStorage.removeItem("credentials");
    }

    dispatch(login(user));

    setTimeout(() => {
      toast.success("Login successful!");
      setLoading(false);
      NProgress.done();
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      #nprogress .bar {
        background: black !important;
      }
      #nprogress .peg {
        box-shadow: 0 0 10px black, 0 0 5px black !important;
      }
      #nprogress .spinner-icon {
        border-top-color: black !important;
        border-left-color: black !important;
      }
      #nprogress .spinner {
        border-color: black !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-white">
      <div className="hidden lg:flex items-center justify-center">
        <img
          alt="Modern armchair with throw blanket"
          src="image.png"
          width={550}
          height={550}
          className="h-auto w-auto max-h-[65%] max-w-[65%] object-cover"
        />
      </div>
      <div className="flex flex-col px-6 lg:px-12">
        <div className="flex flex-col justify-center flex-1 pb-12">
          <div className="mx-auto w-full max-w-[440px] space-y-6">
            <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
<p className="mt-2 text-sm text-gray-600">
    Please sign in to your account to continue and access personalized features.
</p>

            </div>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <label htmlFor="username" className="text-gray-700">
                  Your Username
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
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <Label
                    htmlFor="rememberMe"
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
                className={`w-full bg-black text-white hover:bg-gray-950 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
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
