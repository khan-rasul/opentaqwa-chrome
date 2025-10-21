/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2024 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const AuthModal = ({ isOpen, onClose }) => {
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (generalError) {
      setGeneralError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignUp) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      let result;
      if (isSignUp) {
        result = await signUp(formData.name, formData.email, formData.password);
      } else {
        result = await signIn(formData.email, formData.password);
      }

      if (result.success) {
        // Reset form and close modal
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        onClose();
      } else {
        setGeneralError(result.error);
      }
    } catch (error) {
      setGeneralError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setGeneralError("");
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gradient-to-r from-slate-600/30 to-slate-700/20 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Background decoration - OpenTaqwā colors */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-plum/10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-forest/5 rounded-full"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 z-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
        >
          <X className="w-5 h-5 text-white/90" />
        </button>

        {/* Content */}
        <div className="relative p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white font-quicksand mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-white/70 font-montserrat text-sm">
              {isSignUp
                ? "Join the OpenTaqwā community"
                : "Continue your spiritual journey"}
            </p>
          </div>

          {/* General Error */}
          {generalError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm font-montserrat">
                {generalError}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (Sign up only) */}
            {isSignUp && (
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2 font-montserrat">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-forest/20 border border-forest/30 rounded-lg py-3 px-10 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:bg-forest/30 transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 font-montserrat">
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2 font-montserrat">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-forest/20 border border-forest/30 rounded-lg py-3 px-10 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:bg-forest/30 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 font-montserrat">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2 font-montserrat">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-forest/20 border border-forest/30 rounded-lg py-3 px-10 pr-12 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:bg-forest/30 transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 font-montserrat">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password field (Sign up only) */}
            {isSignUp && (
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2 font-montserrat">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-forest/20 border border-forest/30 rounded-lg py-3 px-10 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:bg-forest/30 transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1 font-montserrat">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-quicksand shadow-lg"
            >
              {isLoading
                ? "Please wait..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </button>
          </form>

          {/* Toggle between sign in/sign up */}
          <div className="text-center mt-6">
            <p className="text-white/70 text-sm font-montserrat">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={toggleMode}
                className="text-gold-light hover:text-gold font-semibold transition-colors"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          {/* Dev Note */}
          <div className="mt-6 p-3 bg-gold/10 border border-gold/30 rounded-lg">
            <p className="text-gold-light text-xs font-montserrat text-center">
              ⚠️ Development Mode: Data stored locally only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
