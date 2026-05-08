import { Box, Typography, Stack, Divider, Skeleton } from "@mui/material";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { motion } from "framer-motion";

// ============================================
// MODERN MINI SPARKLINE WITH ANIMATION
// ============================================
const MiniSparkline = ({ data, color, animate = true }) => {
  const [show, setShow] = useState(!animate);
  
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setShow(true), 300);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  if (!show) return <Box sx={{ width: 100, height: 34 }} />;

  return (
    <AreaChart
      width={100}
      height={34}
      data={data}
      margin={{ top: 6, right: 6, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={2}
        fill={`url(#grad-${color.replace("#", "")})`}
        dot={false}
        activeDot={{ r: 3, fill: color, stroke: "#fff", strokeWidth: 1.5 }}
        isAnimationActive={true}
        animationDuration={1000}
        animationBegin={0}
      />
    </AreaChart>
  );
};

// ============================================
// MODERN STAT ITEM WITH GLASS EFFECT
// ============================================
const StatItem = ({
  label,
  value,
  color,
  subText,
  tooltip = "",
  trendText,
  trendType,
  trendData,
  delay = 0,
}) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      sx={{
        flex: 1,
        px: { xs: 2, md: 3 },
        py: 2.8,
        position: "relative",
        "&:hover": {
          background: "rgba(255, 255, 255, 0.02)",
          transition: "all 0.3s ease",
        },
      }}
    >
      {/* LABEL WITH TOOLTIP */}
      <Stack direction="row" spacing={0.6} alignItems="center" mb={0.5}>
        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "#9CA3AF",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>
        {tooltip && (
          <Tooltip title={tooltip} arrow placement="top">
            <InfoOutlinedIcon
              sx={{
                fontSize: "0.85rem",
                color: "#6B7280",
                cursor: "pointer",
                opacity: 0.6,
                "&:hover": { opacity: 1, color: "#9CA3AF" },
                transition: "all 0.2s ease",
              }}
            />
          </Tooltip>
        )}
      </Stack>

      {/* MAIN VALUE */}
      <Typography
        sx={{
          fontSize: { xs: "2.2rem", md: "2.8rem" },
          fontWeight: 800,
          color: color,
          lineHeight: 1.1,
          fontFeatureSettings: "'tnum'",
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </Typography>

      {/* SUBTEXT */}
      {subText && (
        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 500,
            color: "#6B7280",
            mt: 0.5,
          }}
        >
          {subText}
        </Typography>
      )}

      {/* TREND SECTION */}
      {(trendText || trendData) && (
        <Stack direction="row" spacing={1.2} alignItems="center" mt={1.8}>
          {trendData && <MiniSparkline data={trendData} color={color} />}
          
          {trendText && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              {trendType === "up" && (
                <TrendingUpIcon sx={{ fontSize: "0.9rem", color: "#10B981" }} />
              )}
              {trendType === "down" && (
                <TrendingDownIcon sx={{ fontSize: "0.9rem", color: "#EF4444" }} />
              )}
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: trendType === "up" ? "#10B981" : trendType === "down" ? "#EF4444" : "#6B7280",
                }}
              >
                {trendText}
              </Typography>
            </Stack>
          )}
        </Stack>
      )}
    </Box>
  );
};

// ============================================
// INTERACTIVE RISK PIE CHART
// ============================================
const RiskPieChart = ({ data, onHover }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const COLORS = {
    High: { main: "#F87171", light: "#FCA5A5", dark: "#DC2626" },
    Medium: { main: "#FBBF24", light: "#FCD34D", dark: "#D97706" },
    Low: { main: "#34D399", light: "#6EE7B7", dark: "#059669" },
  };

  const total = data.reduce((sum, d) => sum + d.value, 0);

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
    if (onHover) onHover(data[index]);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    if (onHover) onHover(null);
  };

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
            {Object.entries(COLORS).map(([key, colors]) => (
              <linearGradient
                key={key}
                id={`risk-grad-${key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={colors.main} stopOpacity={0.95} />
                <stop offset="100%" stopColor={colors.dark} stopOpacity={0.7} />
              </linearGradient>
            ))}
          </defs>
          
          <RechartsTooltip
            contentStyle={{
              background: "rgba(11, 15, 25, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
              color: "#fff",
              fontSize: "12px",
            }}
            formatter={(value, name) => [`${value} contracts`, name]}
          />
          
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1.5}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animationBegin={300}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={`url(#risk-grad-${entry.name})`}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                style={{
                  cursor: "pointer",
                  transition: "opacity 0.2s ease",
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* CENTER CONTENT - ELEGANT */}
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
          component={motion.div}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          sx={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {total}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.65rem",
            fontWeight: 600,
            color: "#6B7280",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            mt: 0.5,
          }}
        >
          Total
        </Typography>
      </Box>
    </Box>
  );
};

// ============================================
// MAIN STATS CARD COMPONENT
// ============================================
const StatsCard = ({ contracts = [], loading = false }) => {
  const [hoveredRisk, setHoveredRisk] = useState(null);
  
  // =======================
  // 📊 DYNAMIC STAT LOGIC
  // =======================
  const totalContracts = contracts.length;
  
  const highRiskCount = contracts.filter((c) => c.riskLevel === "High").length;
  const mediumRiskCount = contracts.filter((c) => c.riskLevel === "Medium").length;
  const lowRiskCount = contracts.filter((c) => c.riskLevel === "Low").length;
  
  // Analyzed contracts only for risk score
  const analyzedContracts = contracts.filter(c => c.riskLevel);
  const avgRiskScore = analyzedContracts.length === 0 
    ? 0 
    : Math.round(
        analyzedContracts.reduce((sum, c) => {
          const scoreMap = { High: 85, Medium: 55, Low: 25 };
          return sum + (scoreMap[c.riskLevel] || 0);
        }, 0) / analyzedContracts.length
      );
  
  // Generate mock trend data for visual appeal
  const generateTrendData = (baseValue) => {
    return Array.from({ length: 12 }, (_, i) => ({
      value: baseValue * (0.7 + Math.sin(i / 2) * 0.15 + Math.random() * 0.1),
    }));
  };
  
  const riskData = [
    { name: "High", value: highRiskCount, color: "#F87171" },
    { name: "Medium", value: mediumRiskCount, color: "#FBBF24" },
    { name: "Low", value: lowRiskCount, color: "#34D399" },
  ].filter(r => r.value > 0);

  // Loading state
  if (loading) {
    return (
      <Box sx={{ p: 3, borderRadius: "24px", background: "rgba(255,255,255,0.02)" }}>
        <Skeleton variant="text" width="40%" height={24} sx={{ bgcolor: "rgba(255,255,255,0.05)", mb: 2 }} />
        <Stack direction="row" spacing={3}>
          {[1, 2, 3].map(i => (
            <Box key={i} sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: "rgba(255,255,255,0.05)" }} />
              <Skeleton variant="text" width="80%" height={48} sx={{ bgcolor: "rgba(255,255,255,0.05)" }} />
            </Box>
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        width: "100%",
        borderRadius: "28px",
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "rgba(255, 255, 255, 0.12)",
          boxShadow: "0 12px 48px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {/* 🔝 TOP STATS ROW */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ 
              borderColor: "rgba(255, 255, 255, 0.06)",
              display: { xs: "none", md: "block" },
            }}
          />
        }
      >
        <StatItem
          label="Total Contracts"
          value={totalContracts}
          color="#60A5FA"
          subText="Active & archived"
          tooltip="Total number of contracts in your portfolio"
          trendType="neutral"
          trendText="All time"
          trendData={generateTrendData(totalContracts || 10)}
          delay={0.1}
        />

        <StatItem
          label="High Risk"
          value={highRiskCount}
          color="#F87171"
          subText="Requires attention"
          tooltip="Contracts with high risk score (≥70)"
          trendType={highRiskCount > 0 ? "up" : "neutral"}
          trendText={highRiskCount > 0 ? `${highRiskCount} need review` : "No high risk"}
          trendData={generateTrendData(highRiskCount || 5)}
          delay={0.15}
        />

        <StatItem
          label="Avg Risk Score"
          value={`${avgRiskScore}`}
          color="#FBBF24"
          subText={avgRiskScore > 70 ? "⚠️ High portfolio risk" : avgRiskScore > 40 ? "📊 Moderate risk" : "✅ Low risk portfolio"}
          tooltip="Average risk score across all analyzed contracts"
          trendType={avgRiskScore > 60 ? "up" : avgRiskScore < 40 ? "down" : "neutral"}
          trendText={avgRiskScore > 60 ? "Above threshold" : avgRiskScore < 40 ? "Good standing" : "Stable"}
          trendData={generateTrendData(avgRiskScore || 50)}
          delay={0.2}
        />
      </Stack>

      {/* DIVIDER */}
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.06)" }} />

      {/* 🥧 RISK DISTRIBUTION SECTION */}
      <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#9CA3AF",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Risk Distribution
          </Typography>
          
          {hoveredRisk && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <Typography sx={{ fontSize: "0.7rem", color: hoveredRisk.color, fontWeight: 600 }}>
                {hoveredRisk.value} contracts
              </Typography>
            </motion.div>
          )}
        </Stack>

        {riskData.length > 0 ? (
          <RiskPieChart data={riskData} onHover={setHoveredRisk} />
        ) : (
          <Box
            sx={{
              height: 260,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6B7280",
            }}
          >
            <Typography>No risk data available</Typography>
          </Box>
        )}

        {/* LEGEND - Modern with interactive dots */}
        <Stack
          direction="row"
 spacing={4}
          justifyContent="center"
          alignItems="center"
          mt={3}
          flexWrap="wrap"
          useFlexGap
        >
          {riskData.map((r) => (
            <Stack
              key={r.name}
              direction="row"
              spacing={1.2}
              alignItems="center"
              sx={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
              onMouseEnter={() => setHoveredRisk(r)}
              onMouseLeave={() => setHoveredRisk(null)}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: r.color,
                  boxShadow: `0 0 8px ${r.color}`,
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#E5E7EB",
                }}
              >
                {r.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: r.color,
                }}
              >
                {r.value}
              </Typography>
              <Typography sx={{ fontSize: "0.7rem", color: "#6B7280" }}>
                ({Math.round((r.value / totalContracts) * 100)}%)
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default StatsCard;