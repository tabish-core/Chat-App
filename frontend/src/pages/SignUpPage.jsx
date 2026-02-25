import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-14">
        <div className="w-full max-w-sm space-y-10">

          {/* Logo + Heading */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-base-content">TabTalk</h1>
            <p className="text-sm text-base-content/50 mt-1">Join and start chatting in seconds.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-base-content/50">Full Name</label>
              <div className="flex items-center gap-3 border border-base-200/60 rounded-xl bg-base-100 px-4 py-3 focus-within:border-base-content/25 transition-colors">
                <User className="h-4 w-4 text-base-content/30 flex-shrink-0" />
                <input
                  type="text"
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-base-content/30 text-base-content focus:ring-0"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-base-content/50">Email</label>
              <div className="flex items-center gap-3 border border-base-200/60 rounded-xl bg-base-100 px-4 py-3 focus-within:border-base-content/25 transition-colors">
                <Mail className="h-4 w-4 text-base-content/30 flex-shrink-0" />
                <input
                  type="email"
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-base-content/30 text-base-content focus:ring-0"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-base-content/50">Password</label>
              <div className="flex items-center gap-3 border border-base-200/60 rounded-xl bg-base-100 px-4 py-3 focus-within:border-base-content/25 transition-colors">
                <Lock className="h-4 w-4 text-base-content/30 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-base-content/30 text-base-content focus:ring-0"
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-base-content/30 hover:text-base-content/60 transition-colors flex-shrink-0"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-full rounded-xl bg-base-content text-base-100 border-none hover:opacity-85 transition-opacity font-semibold tracking-wide mt-2"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Creating account...</>
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-base-content/50 text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-base-content hover:opacity-70 transition-opacity underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Chat without clutter."
        subtitle="Simple, fast, and focused"
      />
    </div>
  );
};
export default SignUpPage;