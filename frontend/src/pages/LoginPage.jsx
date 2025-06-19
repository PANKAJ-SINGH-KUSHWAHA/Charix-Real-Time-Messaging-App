import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, MessageSquare, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 sm:p-12 min-h-screen bg-base-100">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center text-center mb-8">
          <MessageSquare className="w-6 h-6 text-primary mb-2" />
          <h1 className="text-2xl font-bold">Login to Your Account</h1>
          <p className="text-base-content/60">Welcome back! Please enter your credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-base-content/40" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="input input-bordered w-full pl-10"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="input input-bordered w-full pl-10 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-base-content/40" />
                ) : (
                  <Eye className="w-5 h-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="btn btn-primary w-full flex justify-center items-center gap-2"
          >
            {isLoggingIn && <Loader2 className="size-5 animate-spin" />}
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="link link-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
