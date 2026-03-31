import { Box, Typography, Stack, Divider } from "@mui/material";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const MiniSparkline = ({ data, color }) => {
  return (
    <AreaChart
      width={100}
      height={34}
      data={data}
      margin={{ top: 6, right: 6, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0.05} />
        </linearGradient>
      </defs>

      <Area
        type="monotone"
        dataKey="value"
        stroke="#FFFFFF"
        strokeWidth={2}
        fill={`url(#grad-${color})`}
        dot={false}
        activeDot={{ r: 4, fill: "#FFFFFF" }}
      />
    </AreaChart>
  );
};

const StatItem = ({
  label,
  value,
  color,
  subText, // 
  tooltip = "", // default value
  trendText,
  trendType,
  trendData,
}) => {
  return (
    <Box sx={{ flex: 1, px: { xs: 2, md: 3 }, py: 2.4 }}>
      {/* LABEL */}
      <Stack direction="row" spacing={0.6} alignItems="center">
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#9CA3AF",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>

        <Tooltip title={tooltip} arrow>
          <InfoOutlinedIcon
            sx={{
              fontSize: "0.9rem",
              color: "#9CA3AF",
              cursor: "pointer",
              opacity: 0.75,
              "&:hover": { opacity: 1 },
            }}
          />
        </Tooltip>
      </Stack>

      {/* VALUE */}
      <Typography
        sx={{
          fontSize: { xs: "2.4rem", md: "3rem" },
          fontWeight: 800,
          color,
          lineHeight: 1.1,
          mt: 0.5,
        }}
      >
        {value}
      </Typography>

      {/* 🔹 SUBTEXT (NEW – UNDER NUMBER) */}
      <Typography
        sx={{
          fontSize: "0.8rem",
          fontWeight: 500,
          color: "#9CA3AF",
          mt: 0.4,
        }}
      >
        {subText}
      </Typography>

      {/* 🔥 Sparkline + trend */}
      <Stack direction="row" spacing={1} alignItems="center" mt={1.6}>
        <MiniSparkline data={trendData} color={color} />

        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color:
              trendType === "up"
                ? "#EF4444"
                : trendType === "down"
                  ? "#94c522"
                  : "#9CA3AF",
          }}
        >
          {trendType === "up" && "↑ "}
          {trendType === "down" && "↓ "}
          {trendText}
        </Typography>
      </Stack>
    </Box>
  );
};

const RiskPieChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const COLORS = {
    High: "#F87171",
    Medium: "#FBBF24",
    Low: "#34D399",
  };

  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <Box
      sx={{
        width: "100%",
        height: 260,
        position: "relative",
      }}
    >
      <ResponsiveContainer>
        <PieChart>
          <defs>
            {Object.entries(COLORS).map(([key, color]) => (
              <linearGradient
                key={key}
                id={`risk-grad-${key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.95} />
                <stop offset="100%" stopColor={color} stopOpacity={0.55} />
              </linearGradient>
            ))}
          </defs>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={78} // 👈 thinner, elegant ring
            outerRadius={108}
            paddingAngle={4}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={1}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={`url(#risk-grad-${entry.name})`}
                opacity={
                  activeIndex === null || activeIndex === index ? 1 : 0.35
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* 🎯 CENTER CONTENT */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.9rem",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1,
          }}
        >
          {total}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#9CA3AF",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            mt: 0.6,
          }}
        >
          Contracts
        </Typography>
      </Box>
    </Box>
  );
};

const StatsCard = ({ contracts = [] }) => {
  // =======================
  // 📊 DYNAMIC STAT LOGIC
  // =======================

  // Total contracts
  const totalContracts = contracts.length;

  // Count by risk level
  const highRiskCount = contracts.filter((c) => c.riskLevel === "High").length;

  const mediumRiskCount = contracts.filter(
    (c) => c.riskLevel === "Medium",
  ).length;

  const lowRiskCount = contracts.filter((c) => c.riskLevel === "Low").length;

  // Average risk exposure calculation
  const riskScoreMap = {
    High: 100,
    Medium: 60,
    Low: 30,
  };

  const averageRisk =
    totalContracts === 0
      ? 0
      : Math.round(
          contracts.reduce((sum, c) => {
            return sum + (riskScoreMap[c.riskLevel] || 0);
          }, 0) / totalContracts,
        );

  const riskData = [
    { name: "High", value: highRiskCount },
    { name: "Medium", value: mediumRiskCount },
    { name: "Low", value: lowRiskCount },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "22px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* 🔝 TOP STATS — THIS MUST CONTAIN StatItem */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "rgba(255,255,255,0.08)" }}
          />
        }
      >
        <StatItem
          label="Total Contracts"
          value={totalContracts}
          color="#60A5FA"
          subText="All uploaded contracts"
          tooltip="Includes both analyzed and pending contracts"
          trendType="neutral"
          trendText="Across your workspace"
          trendData={[{ value: totalContracts }]}
        />

        <StatItem
          label="High-Risk Contracts"
          value={highRiskCount}
          color="#F87171"
          subText="Require immediate attention"
          tooltip="Contracts with risk score ≥ 70"
          trendType="neutral"
          trendText="Critical exposure"
          trendData={[{ value: highRiskCount }]}
        />

        <StatItem
          label="Average Risk Exposure"
          value={`${averageRisk}%`}
          color="#FBBF24"
          subText="Overall portfolio risk"
          tooltip="Average risk score of analyzed contracts only"
          trendType="neutral"
          trendText="Calculated from analyzed contracts"
          trendData={[{ value: averageRisk }]}
        />
      </Stack>

      {/* 🔽 DIVIDER */}
      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      {/* 🥧 PIE CHART (ADDITIONAL, NOT REPLACEMENT) */}
      <Box sx={{ px: 4, py: 3 }}>
        <Typography
          sx={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#9CA3AF",
            mb: 2,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Risk Distribution
        </Typography>

        <RiskPieChart data={riskData} />
        <Stack direction="row" spacing={5} justifyContent="center" mt={2}>
          {riskData.map((r) => (
            <Stack
              key={r.name}
              direction="row"
              spacing={1.2}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background:
                    r.name === "High"
                      ? "#F87171"
                      : r.name === "Medium"
                        ? "#FBBF24"
                        : "#34D399",
                  boxShadow: "0 0 10px rgba(255,255,255,0.25)",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#E5E7EB",
                }}
              >
                {r.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "#9CA3AF",
                }}
              >
                {r.value}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* legend stays here */}
      </Box>
    </Box>
  );
};

export default StatsCard;
