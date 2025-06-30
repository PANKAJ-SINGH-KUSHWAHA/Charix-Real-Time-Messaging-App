// src/pages/VerifyOtp.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const email = new URLSearchParams(location.search).get("email");

  const verifyOtp = useAuthStore((state) => state.verifyOtp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return;

    setSubmitting(true);
    const success = await verifyOtp({ email, otp });
    setSubmitting(false);
    
    if (success) { navigate('/')}
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
  <h2 className="text-2xl font-semibold mb-4 text-center">Email Verification</h2>
  <p className="mb-4 text-center text-sm text-gray-500 dark:text-gray-300">
    Enter the 6-digit OTP sent to <strong>{email}</strong>
  </p>
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <input
      className="border rounded p-2 text-center tracking-widest"
      type="text"
      inputMode="numeric"
      placeholder="------"
      value={otp}
      maxLength="6"
      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
      required
    />
    <button
      className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      type="submit"
      disabled={submitting}
    >
      {submitting ? "Verifying..." : "Verify OTP"}
    </button>
  </form>
</div>

  );
};

export default VerifyOtp;
