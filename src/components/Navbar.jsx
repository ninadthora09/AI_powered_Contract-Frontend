import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

// ✅ CHANGE 1: accept props
export default function Navbar({ onLogin, onRegister }) {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "transparent",
        boxShadow: "none",
        pt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            backdropFilter: "blur(16px)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "999px",
            px: { xs: 2, md: 4 },
          }}
        >
          <Toolbar disableGutters sx={{ minHeight: 64 }}>
            {/* LEFT – LOGO */}
            <Typography
              fontWeight={700}
              color="#FFFFFF"
              sx={{ cursor: "pointer", mr: 4 }}
              onClick={() => navigate("/")}
            >
              SwiftContract AI
            </Typography>

            {/* CENTER – LINKS */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                gap: { xs: 1, md: 3 },
              }}
            >
              {["about", "how-it-works", "contact"].map((id) => (
                <Button
                  key={id}
                  onClick={() => scrollTo(id)}
                  sx={{ color: "#E5E7EB", fontWeight: 500 }}
                >
                  {id === "how-it-works"
                    ? "How it Works"
                    : id.charAt(0).toUpperCase() + id.slice(1)}
                </Button>
              ))}
            </Box>

            {/* RIGHT – ACTIONS */}
            <Box sx={{ display: "flex", gap: 1.5 }}>
              {/* ✅ CHANGE 2: behavior only */}
              <Button
                onClick={onLogin}
                sx={{
                  textTransform: "none",
                  color: "#F472B6",
                  border: "1px solid rgba(244,114,182,0.5)",
                  borderRadius: "999px",
                  px: 2.5,
                  "&:hover": {
                    background: "rgba(244,114,182,0.1)",
                  },
                }}
              >
                Login
              </Button>

              {/* ✅ CHANGE 3: behavior only */}
              <Button
                onClick={onRegister}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#0B0F1A",
                  borderRadius: "999px",
                  px: 3,
                  background: "linear-gradient(135deg, #F472B6, #4F8CFF)",
                  boxShadow: "0 10px 30px rgba(79,140,255,0.35)",
                  "&:hover": {
                    boxShadow: "0 14px 36px rgba(79,140,255,0.45)",
                  },
                }}
              >
                Register
              </Button>
            </Box>
          </Toolbar>
        </Box>
      </Container>
    </AppBar>
  );
}
