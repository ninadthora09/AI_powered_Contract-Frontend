import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

import Navbar from "../../components/Navbar";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import About from "./sections/About";
import Contact from "./sections/Contact";

import AuthModal from "../../components/auth/AuthModal";
import Login from "../auth/Login";
import Register from "../auth/Register";

const Landing = () => {
  const [authMode, setAuthMode] = useState(null);      // "login" | "register"
  const [authRedirect, setAuthRedirect] = useState(null);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // ✅ ONLY THIS

  // ✅ Navigate ONLY after auth becomes true
  useEffect(() => {
    if (isAuthenticated && authRedirect) {
      navigate(authRedirect, { replace: true });
      setAuthRedirect(null);
      setAuthMode(null);
    }
  }, [isAuthenticated, authRedirect, navigate]);

  return (
    <>
      <Navbar
        onLogin={() => {
          setAuthRedirect("/dashboard");
          setAuthMode("login");
        }}
        onRegister={() => setAuthMode("register")}
      />

      <section id="hero">
        <Hero
          onUpload={() => {
            if (!isAuthenticated) {
              setAuthRedirect("/dashboard");
              setAuthMode("login");
            } else {
              navigate("/dashboard");
            }
          }}
          onDashboard={() => {
            if (!isAuthenticated) {
              setAuthRedirect("/dashboard");
              setAuthMode("login");
            } else {
              navigate("/dashboard");
            }
          }}
        />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <AuthModal
        open={Boolean(authMode)}
        onClose={() => setAuthMode(null)}
      >
        {authMode === "login" && (
          <Login
            onSuccess={() => {
              // ❌ NO NAVIGATION HERE
              // Auth state change will trigger useEffect
              setAuthMode(null);
            }}
            switchToRegister={() => setAuthMode("register")}
          />
        )}

        {authMode === "register" && (
          <Register
            onSuccess={() => setAuthMode("login")}
            switchToLogin={() => setAuthMode("login")}
          />
        )}
      </AuthModal>
    </>
  );
};

export default Landing;
