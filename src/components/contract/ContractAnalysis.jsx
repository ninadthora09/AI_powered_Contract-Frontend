import { Box, Typography, CircularProgress, Chip, Paper, Stack, Divider, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion as M } from "framer-motion";
import WarningIcon from "@mui/icons-material/Warning";
import SecurityIcon from "@mui/icons-material/Security";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import { analyzeContract } from "../../services/contract.service";
import RiskBuckets from "../../components/contract/RiskBuckets";

const ContractAnalysis = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyzeContract(id)
      .then(setAnalysis)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <M.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Stack spacing={3} alignItems="center">
            <CircularProgress size={56} thickness={4} sx={{ color: "#3B82F6" }} />
            <Typography sx={{ color: "#070101", fontWeight: 600 }}>Analyzing contract...</Typography>
            <Typography sx={{ color: "#6B7280", fontSize: "0.85rem" }}>AI is reviewing clauses and generating insights</Typography>
          </Stack>
        </M.div>
      </Box>
    );
  }

  if (!analysis) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <ErrorIcon sx={{ fontSize: 48, color: "#EF4444", mb: 2 }} />
        <Typography sx={{ color: "#EF4444" }}>Analysis not available. Please try again.</Typography>
      </Box>
    );
  }

  const hasRisks = analysis.flags?.length > 0;
  const riskCount = analysis.flags?.length || 0;
  const highRisks = analysis.flags?.filter(f => f.severity === "High").length || 0;
  const mediumRisks = analysis.flags?.filter(f => f.severity === "Medium").length || 0;
  const lowRisks = analysis.flags?.filter(f => f.severity === "Low").length || 0;

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", px: { xs: 2, md: 3 }, py: 4 }}>
      {/* Header */}
      <M.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontSize: { xs: "1.8rem", md: "2rem" }, fontWeight: 700, color: "#FFF", mb: 1 }}>
            Contract Analysis
          </Typography>
          <Typography sx={{ color: "#94A3B8" }}>
            AI-powered risk assessment for your contract
          </Typography>
        </Box>
      </M.div>

      {/* Stats Cards */}
      <M.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={4}>
            <Paper sx={{ p: 2, textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px" }}>
              <Typography sx={{ color: "#6B7280", fontSize: "0.7rem", textTransform: "uppercase", mb: 1 }}>Total Risks</Typography>
              <Typography sx={{ color: hasRisks ? "#EF4444" : "#10B981", fontSize: "2rem", fontWeight: 700 }}>{riskCount}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 2, textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px" }}>
              <Typography sx={{ color: "#6B7280", fontSize: "0.7rem", textTransform: "uppercase", mb: 1 }}>High Risk</Typography>
              <Typography sx={{ color: "#EF4444", fontSize: "2rem", fontWeight: 700 }}>{highRisks}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 2, textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px" }}>
              <Typography sx={{ color: "#6B7280", fontSize: "0.7rem", textTransform: "uppercase", mb: 1 }}>Risk Score</Typography>
              <Typography sx={{ color: "#3B82F6", fontSize: "2rem", fontWeight: 700 }}>
                {Math.round((highRisks * 100 + mediumRisks * 50 + lowRisks * 20) / (riskCount || 1))}%
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </M.div>

      {/* AI Summary */}
      <M.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
        <Paper sx={{ p: 3, mb: 4, borderRadius: "20px", background: "rgba(59,130,246,0.05)", borderLeft: "4px solid #3B82F6" }}>
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <SecurityIcon sx={{ color: "#3B82F6", fontSize: 24, mt: 0.3 }} />
            <Box>
              <Typography sx={{ color: "#f69f3b", fontWeight: 600, fontSize: "0.8rem", mb: 0.5 }}>AI SUMMARY</Typography>
              <Typography sx={{ color: "#071022", lineHeight: 1.5, fontSize: "0.9rem" }}>
                {analysis.aiSummary || "No summary available. Analysis completed successfully."}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </M.div>

      {/* Risk Details */}
      {!hasRisks ? (
        <M.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Paper sx={{ p: 5, textAlign: "center", borderRadius: "20px", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <CheckCircleIcon sx={{ fontSize: 56, color: "#10B981", mb: 2 }} />
            <Typography sx={{ color: "#74ad24", fontWeight: 700, fontSize: "1.3rem", mb: 1 }}>No Risky Clauses Found</Typography>
            <Typography sx={{ color: "#94A3B8", fontSize: "0.9rem" }}>This contract appears to be well-structured with standard terms.</Typography>
          </Paper>
        </M.div>
      ) : (
        <M.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Paper sx={{ borderRadius: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}>
              <Typography sx={{ fontWeight: 700, color: "#FFF" }}>Risk Breakdown</Typography>
            </Box>
            <RiskBuckets flags={analysis.flags} />
          </Paper>
        </M.div>
      )}

      {/* Footer */}
      {analysis.analyzedAt && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2 }} />
          <Typography sx={{ color: "#6B7280", fontSize: "0.7rem" }}>
            Analyzed on {new Date(analysis.analyzedAt).toLocaleString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ContractAnalysis;