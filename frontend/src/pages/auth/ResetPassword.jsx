import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import api from "../../services/api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  
  const [formData, setFormData] = useState({
    email: initialEmail,
    otp: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.otp || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data } = await api.put("/auth/resetpassword", {
        email: formData.email,
        otp: formData.otp,
        password: formData.password
      });

      if (data.success) {
        setSuccess("Password reset successfully! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-500 mt-2">Enter the OTP sent to your email and your new password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
           <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            disabled={!!initialEmail} // Disable if passed via URL
          />

          <Input
            label="OTP Code"
            name="otp"
            placeholder="Enter 6-digit OTP"
            value={formData.otp}
            onChange={handleChange}
          />

          <Input
            label="New Password"
            name="password"
            type="password"
            placeholder="New password"
            value={formData.password}
            onChange={handleChange}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {error && <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center">{error}</div>}
          {success && <div className="p-3 bg-green-50 text-green-600 text-sm rounded-lg text-center">{success}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
