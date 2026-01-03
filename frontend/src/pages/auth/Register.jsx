import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    empId: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
    role: "employee",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.empId || !formData.email || !formData.password || !formData.confirmPassword) {
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

    const res = await register(formData);
    if (res.success) {
      setSuccess(res.message);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2">Start managing your work life with Dayflow.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <Input
            label="Full Name"
            name="name"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
          />

          <div className="grid grid-cols-2 gap-4">
              <Input
                label="Employee ID"
                name="empId"
                placeholder="e.g. EMP001"
                value={formData.empId}
                onChange={handleChange}
                autoComplete="off"
              />
              <Input
                label="Department"
                name="department"
                placeholder="e.g. IT"
                value={formData.department}
                onChange={handleChange}
                autoComplete="off"
              />
          </div>
          
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />

          <div className="grid grid-cols-2 gap-4">
             <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
            />
             <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
            /> 
          </div>
          <p className="text-xs text-gray-400">Password must be at least 6 characters.</p>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            >
              <option value="employee">Employee</option>
              <option value="admin">HR / Admin</option>
            </select>
          </div>

          {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center bg-green-50 p-2 rounded-lg">{success}</div>}

          <Button type="submit" className="w-full" variant="primary">
            Sign Up
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
