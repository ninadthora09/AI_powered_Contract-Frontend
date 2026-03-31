import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/useAuth";

const Login = ({ onSuccess, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      login(data.token);
      onSuccess && onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minWidth: 360,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: 420,
          padding: "28px",
          borderRadius: 24,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              margin: "0 auto 12px",
              borderRadius: 14,
              background:
                "linear-gradient(135deg, #22D3EE, #6366F1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lock size={20} color="#fff" />
          </div>

          <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 700 }}>
            Welcome back
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 13, marginTop: 6 }}>
            Sign in to access your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <p
              style={{
                color: "#F87171",
                fontSize: 13,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          {/* Email */}
          <div style={{ position: "relative", marginBottom: 14 }}>
            <Mail
              size={18}
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9CA3AF",
              }}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px 14px 14px 44px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                color: "#E5E7EB",
                outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ position: "relative", marginBottom: 20 }}>
            <Lock
              size={18}
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9CA3AF",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px 14px 14px 44px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                color: "#E5E7EB",
                outline: "none",
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: 48,
              borderRadius: 16,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              background: "#fff",
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {loading ? "Logging in…" : "Enter Dashboard"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Footer */}
        <p
          style={{
            marginTop: 18,
            textAlign: "center",
            fontSize: 13,
            color: "#9CA3AF",
          }}
        >
          Don’t have an account?{" "}
          <span
            onClick={switchToRegister}
            style={{ color: "#38BDF8", cursor: "pointer" }}
          >
            Register
          </span>
        </p>
      </Motion.div>
    </div>
  );
};

export default Login;
