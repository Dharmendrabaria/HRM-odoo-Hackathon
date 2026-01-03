import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api"; // Axios instance

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("dayflow_token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const { data } = await api.get("/auth/me");
          if (data.success) {
            setUser(data.data);
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("dayflow_token");
          delete api.defaults.headers.common["Authorization"];
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      if (data.success) {
        localStorage.setItem("dayflow_token", data.data.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.data.token}`;
        // Fetch full user profile to ensure consistency
        const profileRes = await api.get("/auth/me");
        setUser(profileRes.data.data);
        return { success: true, role: profileRes.data.data.role };
      }
    } catch (error) {
       return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dayflow_token");
    delete api.defaults.headers.common["Authorization"];
  };

  const register = async (userData) => {
    try {
      const { empId, email, password, role, name, department, designation } = userData;
      const { data } = await api.post("/auth/register", {
        name: name || "New User", // Default or add name field to form
        email,
        password,
        role,
        employeeId: empId,
        department: department || "General",
        designation: designation || "Staff",
      });
      return { success: true, message: "Registration successful!" };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Registration failed" };
    }
  }

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("dayflow_token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const { data } = await api.get("/auth/me");
        if (data.success) {
          setUser(data.data);
          return { success: true };
        }
      }
      return { success: false };
    } catch (error) {
      console.error("Refresh user failed:", error);
      return { success: false };
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    refreshUser,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
