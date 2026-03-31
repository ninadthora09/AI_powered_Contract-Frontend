import { Box, Typography, Chip, Divider } from "@mui/material";
import { motion as Motion } from "framer-motion";

const riskStyles = {
  HIGH: {
    color: "#F87171",
    glow: "rgba(248,113,113,0.25)",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.35)",
  },
  MEDIUM: {
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.25)",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.35)",
  },
  LOW: {
    color: "#34D399",
    glow: "rgba(52,211,153,0.25)",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.35)",
  },
};

const ClauseCard = ({ flag }) => {
  const style = riskStyles[flag.risk] || riskStyles.LOW;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: "20px",
          p: 3,
          mb: 3,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          backdropFilter: "blur(16px)",
          border: `1px solid ${style.border}`,
          boxShadow: `0 0 0 1px ${style.border}, 0 20px 40px rgba(0,0,0,0.55)`,
          overflow: "hidden",
        }}
      >
        {/* Subtle glow */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: style.glow,
            opacity: 0.06,
            pointerEvents: "none",
          }}
        />

        {/* HEADER */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2.5}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1rem",
              color: "#F9FAFB",
              letterSpacing: "-0.01em",
            }}
          >
            {flag.type}
          </Typography>

          <Chip
            label={flag.risk}
            sx={{
              fontWeight: 700,
              fontSize: "0.75rem",
              height: 26,
              color: style.color,
              background: style.bg,
              border: `1px solid ${style.border}`,
              boxShadow: `0 0 12px ${style.glow}`,
            }}
          />
        </Box>

        {/* CONTENT GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
            gap: 3,
          }}
        >
          {/* LEFT — ORIGINAL CLAUSE */}
          <Box
            sx={{
              p: 2,
              borderRadius: "16px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              maxHeight: 260,
              overflowY: "auto",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#9CA3AF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                mb: 0.6,
              }}
            >
              Original Clause
            </Typography>

            <Typography
              sx={{
                fontSize: "0.95rem",
                color: "#D1D5DB",
                lineHeight: 1.8,
                fontStyle: "italic",
                position: "relative",
              }}
            >
              “{flag.clause}”
            </Typography>
          </Box>

          {/* RIGHT — INSIGHTS */}
          <Box>
            {/* WHY RISKY */}
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#9CA3AF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                mb: 0.6,
              }}
            >
              Why this is risky
            </Typography>

            <Typography
              sx={{
                fontSize: "0.9rem",
                color: "#E5E7EB",
                lineHeight: 1.7,
                mb: 2,
              }}
            >
              {flag.plainEnglish}
            </Typography>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />

            {/* SUGGESTED WORDING */}
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#9CA3AF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                mb: 0.6,
              }}
            >
              Suggested safer wording
            </Typography>

            <Box
              sx={{
                p: 1.8,
                borderRadius: "14px",
                background: "rgba(196,181,253,0.08)",
                border: "1px solid rgba(196,181,253,0.25)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "#C4B5FD",
                  lineHeight: 1.7,
                }}
              >
                {flag.suggestion}
              </Typography>
            </Box>

            {/* BASIS */}
            {flag.basedOn && (
              <Typography
                sx={{
                  mt: 2,
                  fontSize: "0.75rem",
                  color: "#9CA3AF",
                }}
              >
                Based on: {flag.basedOn}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Motion.div>
  );
};

export default ClauseCard;
