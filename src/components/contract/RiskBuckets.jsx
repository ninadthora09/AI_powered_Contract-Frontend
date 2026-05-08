import { Box, Typography, Chip, Collapse, IconButton, Paper, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import { motion as M , AnimatePresence } from "framer-motion";
import { useState } from "react";
import ClauseCard from "./ClauseCard";

const RISK_ORDER = ["HIGH", "MEDIUM", "LOW"];

const riskMeta = {
  HIGH: { 
    label: "High Risk", 
    color: "#EF4444", 
    bg: "rgba(239,68,68,0.1)", 
    border: "rgba(239,68,68,0.3)",
    icon: <ErrorIcon sx={{ fontSize: 20 }} />,
    gradient: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))"
  },
  MEDIUM: { 
    label: "Medium Risk", 
    color: "#F59E0B", 
    bg: "rgba(245,158,11,0.1)", 
    border: "rgba(245,158,11,0.3)",
    icon: <WarningIcon sx={{ fontSize: 20 }} />,
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))"
  },
  LOW: { 
    label: "Low Risk", 
    color: "#10B981", 
    bg: "rgba(16,185,129,0.1)", 
    border: "rgba(16,185,129,0.3)",
    icon: <InfoIcon sx={{ fontSize: 20 }} />,
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))"
  },
};

const RiskSection = ({ risk, items, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const meta = riskMeta[risk];

  if (!items.length) return null;

  return (
    <Box mb={2.5}>
      {/* Modern Header */}
      <M.div whileTap={{ scale: 0.99 }}>
        <Paper
          onClick={() => setOpen(!open)}
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            p: 2,
            borderRadius: "16px",
            background: meta.gradient,
            border: `1px solid ${meta.border}`,
            transition: "all 0.2s ease",
            "&:hover": {
              background: meta.bg,
              transform: "translateX(4px)",
            },
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ color: meta.color }}>{meta.icon}</Box>
            <Typography sx={{ fontWeight: 700, color: "#460c0c", fontSize: "0.95rem" }}>
              {meta.label}
            </Typography>
            <Chip
              label={items.length}
              size="small"
              sx={{
                fontWeight: 700,
                color: meta.color,
                background: "rgba(0,0,0,0.3)",
                borderRadius: "10px",
                fontSize: "0.75rem",
              }}
            />
          </Stack>

          <IconButton size="small" sx={{ color: meta.color }}>
            <ExpandMoreIcon
              sx={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </IconButton>
        </Paper>
      </M.div>

      {/* Animated Cards */}
      <AnimatePresence initial={false}>
        {open && (
          <M.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Box mt={2} sx={{ pl: { xs: 0, md: 2 } }}>
              {items.map((flag, idx) => (
                <M.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ClauseCard flag={flag} />
                </M.div>
              ))}
            </Box>
          </M.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const RiskBuckets = ({ flags = [] }) => {
  const grouped = {
    HIGH: flags.filter(f => f.risk === "HIGH" || f.risk === "High"),
    MEDIUM: flags.filter(f => f.risk === "MEDIUM" || f.risk === "Medium"),
    LOW: flags.filter(f => f.risk === "LOW" || f.risk === "Low"),
  };

  const totalRisks = flags.length;

  if (totalRisks === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography sx={{ color: "#6B7280" }}>No risks detected in this contract</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header with counts */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, pb: 2, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {RISK_ORDER.map(risk => {
          const count = grouped[risk].length;
          if (count === 0) return null;
          return (
            <Chip
              key={risk}
              label={`${riskMeta[risk].label}: ${count}`}
              size="small"
              sx={{
                color: riskMeta[risk].color,
                background: riskMeta[risk].bg,
                border: `1px solid ${riskMeta[risk].border}`,
                fontWeight: 600,
              }}
            />
          );
        })}
      </Stack>

      {/* Risk Sections */}
      {RISK_ORDER.map((risk) => (
        <RiskSection
          key={risk}
          risk={risk}
          items={grouped[risk]}
          defaultOpen={risk === "HIGH"}
        />
      ))}
    </Box>
  );
};

export default RiskBuckets;