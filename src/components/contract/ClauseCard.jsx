import { Box, Typography, Chip, Divider, Paper } from "@mui/material";
import { motion as Motion } from "framer-motion";
import GavelIcon from "@mui/icons-material/Gavel";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const riskStyles = {
  HIGH: {
    color: "#EF4444",
    glow: "rgba(239,68,68,0.3)",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.4)",
    icon: <WarningAmberIcon sx={{ fontSize: 20 }} />,
  },
  MEDIUM: {
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.4)",
    icon: <WarningAmberIcon sx={{ fontSize: 20 }} />,
  },
  LOW: {
    color: "#10B981",
    glow: "rgba(16,185,129,0.3)",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.4)",
    icon: <LightbulbIcon sx={{ fontSize: 20 }} />,
  },
};

const ClauseCard = ({ flag }) => {
  const style = riskStyles[flag.risk] || riskStyles.LOW;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          mb: 3,
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${style.border}`,
          overflow: "hidden",
          transition: "all 0.2s ease",
          "&:hover": {
            borderColor: style.color,
            boxShadow: `0 8px 32px ${style.glow}`,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: `1px solid ${style.border}`,
            background: style.bg,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box sx={{ color: style.color }}>{style.icon}</Box>
            <Typography sx={{ fontWeight: 700, color: "#FFF", fontSize: "1rem" }}>
              {flag.type || "Clause"}
            </Typography>
          </Box>
          <Chip
            label={flag.risk}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: "0.7rem",
              height: 26,
              color: style.color,
              background: "rgba(0,0,0,0.3)",
              border: `1px solid ${style.border}`,
              borderRadius: "8px",
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            {/* Left - Original Clause */}
            <Box>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#9CA3AF",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <GavelIcon sx={{ fontSize: 14 }} /> Original Clause
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "14px",
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "#D1D5DB",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                  }}
                >
                  "{flag.clause}"
                </Typography>
              </Box>
            </Box>

            {/* Right - Analysis */}
            <Box>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#9CA3AF",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 1.5,
                }}
              >
                Why It's Problematic
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#E5E7EB",
                  lineHeight: 1.6,
                  mb: 2,
                }}
              >
                {flag.plainEnglish}
              </Typography>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 2 }} />

              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#9CA3AF",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 1.5,
                }}
              >
                Recommended Fix
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "14px",
                  background: "rgba(16,185,129,0.05)",
                  borderLeft: `3px solid ${style.color}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: style.color,
                    lineHeight: 1.6,
                  }}
                >
                  {flag.suggestion}
                </Typography>
              </Box>

              {flag.basedOn && (
                <Typography sx={{ mt: 1.5, fontSize: "0.7rem", color: "#6B7280" }}>
                  Based on: {flag.basedOn}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Motion.div>
  );
};

export default ClauseCard;