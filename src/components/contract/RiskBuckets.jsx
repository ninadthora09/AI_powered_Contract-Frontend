import { Box, Typography, Chip, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import ClauseCard from "./ClauseCard";

const RISK_ORDER = ["HIGH", "MEDIUM", "LOW"];

const riskMeta = {
  HIGH: { label: "High Risk", color: "#F87171" },
  MEDIUM: { label: "Medium Risk", color: "#FBBF24" },
  LOW: { label: "Low Risk", color: "#34D399" },
};

const RiskSection = ({ risk, items, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  if (!items.length) return null;

  return (
    <Box mb={3}>
      {/* Section Header */}
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          p: 1.5,
          borderRadius: "12px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Typography
            sx={{
              fontWeight: 700,
              color: "#F9FAFB",
            }}
          >
            {riskMeta[risk].label}
          </Typography>

          <Chip
            label={items.length}
            size="small"
            sx={{
              fontWeight: 700,
              color: riskMeta[risk].color,
              background: "rgba(255,255,255,0.06)",
            }}
          />
        </Box>

        <IconButton size="small">
          <ExpandMoreIcon
            sx={{
              color: "#9CA3AF",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.25s",
            }}
          />
        </IconButton>
      </Box>

      {/* Cards */}
      <Collapse in={open} timeout="auto">
        <Box mt={2}>
          {items.map((flag, idx) => (
            <ClauseCard key={idx} flag={flag} />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

const RiskBuckets = ({ flags }) => {
  const grouped = {
    HIGH: flags.filter(f => f.risk === "HIGH"),
    MEDIUM: flags.filter(f => f.risk === "MEDIUM"),
    LOW: flags.filter(f => f.risk === "LOW"),
  };

  return (
    <Box>
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
