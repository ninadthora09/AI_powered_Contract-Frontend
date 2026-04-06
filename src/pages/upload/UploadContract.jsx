import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FileUpload from "../../components/contract/FileUpload";
import PdfPreview from "../../components/contract/PdfPreview";
import {
  uploadContract,
  analyzeContract,
} from "../../services/contract.service";
import { useNavigate } from "react-router-dom";

const UploadContract = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [contractId, setContractId] = useState(null);
  const [stage, setStage] = useState("upload"); // upload → review → analyzing

  const navigate = useNavigate();

  const cardStyle = {
    p: 3,
    borderRadius: "20px",
    background: "#0B0F19",
    border: "1px solid rgba(255,255,255,0.08)",
    position: "relative", // 🔥 REQUIRED for close button
  };

  /* ---------------- FILE SELECT ---------------- */
  const handleFileSelect = async (selectedFile) => {
  console.log("FILE SELECTED"); // 🔥 ADD THIS

  setFile(selectedFile);
  try {
    const res = await uploadContract(selectedFile);
    console.log("API CALLED"); // 🔥 ADD THIS

    setContractId(res.contractId);
    setStage("review");
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  }
};

  /* ---------------- ANALYZE ---------------- */
  const handleAnalyze = async () => {
    if (!contractId) return;

    try {
      setStage("analyzing");
      await analyzeContract(contractId);
      setTimeout(() => {
        navigate(`/contracts/${contractId}/analysis`);
      }, 600);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid container justifyContent="center">
      {/* ───────────── UPLOAD (SMALL & CENTERED) ───────────── */}
      {stage === "upload" && (
        <Grid item xs={12} md={5}>
          <Box sx={{ ...cardStyle, textAlign: "center" }}>
            {/* CLOSE BUTTON */}
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 2,
                width: 32,
                height: 32,
                color: "#E5E7EB",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  background: "rgba(248,113,113,0.25)",
                  color: "#FCA5A5",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <FileUpload onFileSelect={handleFileSelect} />
          </Box>
        </Grid>
      )}

      {/* ───────────── PREVIEW (WIDE, FIXED WIDTH) ───────────── */}
      {stage === "review" && (
        <Grid item xs={12}>
          <Box
            sx={{
              width: { xs: "100%", lg: "600px" }, // 🔒 LOCKED WIDTH
              mx: "auto",
              p: 3,
              borderRadius: "20px",
              background: "#05070D",
              border: "1px solid rgba(255,255,255,0.08)",
              position: "relative", // 🔥 REQUIRED
            }}
          >
            {/* CLOSE BUTTON */}
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 2,
                width: 32,
                height: 32,
                color: "#E5E7EB",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  background: "rgba(248,113,113,0.25)",
                  color: "#FCA5A5",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <PdfPreview file={file} />

            {/* ACTION BAR */}
            <Box
              sx={{
                mt: 3,
                height: 56,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setFile(null);
                  setStage("upload");
                }}
                sx={{ px: 3, borderRadius: "999px" }}
              >
                Change File
              </Button>

              <Button
                variant="contained"
                startIcon={<AutoAwesomeIcon />}
                onClick={handleAnalyze}
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: "999px",
                  fontWeight: 700,
                  textTransform: "none",
                  background:
                    "linear-gradient(135deg, #6366F1, #A855F7)",
                }}
              >
                Analyze Contract
              </Button>
            </Box>
          </Box>
        </Grid>
      )}

      {/* ───────────── ANALYZING ───────────── */}
      {stage === "analyzing" && (
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 4,
              borderRadius: "20px",
              textAlign: "center",
              background:
                "linear-gradient(180deg, rgba(99,102,241,0.15), rgba(2,6,23,0.95))",
              border: "1px solid rgba(99,102,241,0.35)",
            }}
          >
            <CircularProgress size={48} />
            <Typography sx={{ mt: 2, fontWeight: 700 }}>
              Analyzing contract…
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default UploadContract;
