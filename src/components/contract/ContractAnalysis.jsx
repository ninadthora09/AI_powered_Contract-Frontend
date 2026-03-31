import { Box, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { analyzeContract } from "../../services/contract.service";
import RiskBuckets from "../../components/contract/RiskBuckets";

const ContractAnalysis = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await analyzeContract(id);

        // Debug (safe to remove later)
        console.log("ANALYSIS FLAGS COUNT:", res.flags?.length);
        console.log("ANALYSIS FLAGS:", res.flags);

        setAnalysis(res);
      } catch (err) {
        console.error("Failed to load analysis", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  /* -------------------- LOADING STATE -------------------- */
  if (loading) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.85), rgba(2,6,23,0.95))",
          backdropFilter: "blur(12px)",
          borderRadius: 3,
        }}
      >
        <CircularProgress
          size={48}
          thickness={4}
          sx={{
            color: "#6366F1",
            filter: "drop-shadow(0 0 12px rgba(99,102,241,0.6))",
          }}
        />

        <Typography
          sx={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#9CA3AF",
            letterSpacing: "0.02em",
          }}
        >
          Analyzing contract…
        </Typography>

        <Typography
          sx={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          This usually takes a few seconds
        </Typography>
      </Box>
    );
  }

  /* -------------------- ERROR STATE -------------------- */
  if (!analysis) {
    return (
      <Typography sx={{ color: "#F87171" }}>
        Analysis not available.
      </Typography>
    );
  }

  /* -------------------- MAIN UI -------------------- */
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        py: 4,
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: 800,
          color: "#112b46",
          mb: 1,
        }}
      >
        AI Contract Analysis
      </Typography>

      <Typography
        sx={{
          fontSize: "0.9rem",
          color: "#101b2f",
          mb: 4,
        }}
      >
        Detailed risk breakdown and AI-generated legal insights.
      </Typography>

      {/* NO RISKS */}
      {analysis.flags?.length === 0 ? (
        <Box
          sx={{
            p: 3,
            borderRadius: "14px",
            background: "rgba(52,211,153,0.12)",
            border: "1px solid rgba(52,211,153,0.35)",
          }}
        >
          <Typography sx={{ color: "#34D399", fontWeight: 700 }}>
            ✅ No risky clauses detected
          </Typography>

          <Typography sx={{ color: "#9CA3AF", mt: 1 }}>
            {analysis.aiSummary}
          </Typography>
        </Box>
      ) : (
        /* RISK BUCKETS */
        <Box
          sx={{
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.85), rgba(2,6,23,0.95))",
            borderRadius: "22px",
            p: { xs: 2.5, md: 4 },
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <RiskBuckets flags={analysis.flags || []} />
        </Box>
      )}
    </Box>
  );
};

export default ContractAnalysis;
