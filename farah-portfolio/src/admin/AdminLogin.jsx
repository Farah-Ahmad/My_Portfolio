import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import authService from "../services/authService";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkExistingSession = async () => {
      const token = authService.getToken();

      if (!token) {
        setCheckingSession(false);
        return;
      }

      try {
        await authService.getCurrentAdmin();

        navigate(
          "/admin/dashboard",
          { replace: true }
        );
      } catch {
        authService.clearSession();
        setCheckingSession(false);
      }
    };

    checkExistingSession();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await authService.login(
        formData
      );

      authService.saveSession(
        data.token,
        data.user
      );

      navigate(
        "/admin/dashboard",
        { replace: true }
      );
    } catch (error) {
      if (error.response?.status === 401) {
        setError(
          "Invalid email or password."
        );
      } else if (
        error.response?.status === 403
      ) {
        setError(
          "You are not authorized to access the admin area."
        );
      } else if (
        error.response?.status === 422
      ) {
        setError(
          "Please enter a valid email and password."
        );
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <main className="admin-login-page">
        <div className="admin-auth-checking">
          Checking session...
        </div>
      </main>
    );
  }

  return (
    <main className="admin-login-page">

      <motion.div
        className="admin-login-card"
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >

        <div className="admin-login-header">

          <div className="admin-login-logo">
            Farah<span>.</span>
          </div>

          <p>
            Portfolio Administration
          </p>

          <h1>
            Welcome Back
          </h1>

          <p className="admin-login-description">
            Sign in to manage your portfolio.
          </p>

        </div>

        {error && (
          <div className="admin-login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label htmlFor="admin-email">
              Email
            </label>

            <input
              id="admin-email"
              name="email"
              type="email"
              placeholder="admin@email.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

          </div>

          <motion.button
            type="submit"
            className="admin-login-button"
            disabled={loading}
            whileHover={{
              y: loading ? 0 : -2,
            }}
            whileTap={{
              scale: loading ? 1 : 0.98,
            }}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}

            {!loading && (
              <span>→</span>
            )}
          </motion.button>

        </form>

        <button
          type="button"
          className="admin-back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Portfolio
        </button>

      </motion.div>

    </main>
  );
}

export default AdminLogin;