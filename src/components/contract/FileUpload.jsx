import { Box, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const FileUpload = ({ onFileSelect }) => {
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <Box
      component="label"
      sx={{
        width: "100%",
        minHeight: 240,
        borderRadius: "22px",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",

        /* GLASS BASE */
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        backdropFilter: "blur(18px)",
        border: "1px dashed rgba(255,255,255,0.28)",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",

        "&:hover": {
          borderColor: "#818CF8",
          transform: "translateY(-2px)",
          boxShadow:
            "0 20px 50px rgba(99,102,241,0.35), inset 0 0 0 1px rgba(99,102,241,0.35)",
        },

        /* GLOW LAYER */
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(600px circle at 50% 20%, rgba(99,102,241,0.18), transparent 40%)",
          opacity: 0,
          transition: "opacity 0.4s ease",
        },

        "&:hover::before": {
          opacity: 1,
        },
      }}
    >
      {/* ICON BADGE */}
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "16px",
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(168,85,247,0.25))",
          boxShadow: "0 10px 30px rgba(99,102,241,0.45)",
        }}
      >
        <UploadFileIcon sx={{ fontSize: 32, color: "#E0E7FF" }} />
      </Box>

      {/* PRIMARY TEXT */}
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "#FFFFFF",
          mb: 0.6,
          letterSpacing: "-0.01em",
        }}
      >
        Upload contract
      </Typography>

      {/* SECONDARY TEXT */}
      <Typography
        sx={{
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.6,
        }}
      >
        Drag & drop your PDF here or click to browse
      </Typography>

      {/* FOOT NOTE */}
      <Box
        sx={{
          mt: 2,
          px: 2,
          py: 0.6,
          borderRadius: "999px",
          fontSize: "0.7rem",
          fontWeight: 600,
          color: "#C7D2FE",
          background: "rgba(99,102,241,0.15)",
          display: "flex",
          alignItems: "center",
          gap: 0.6,
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 14 }} />
        PDF • Max 10MB • Secure
      </Box>

      {/* INPUT */}
      <input
        type="file"
        hidden
        accept="application/pdf"
        onChange={handleChange}
      />
    </Box>
  );
};

export default FileUpload;
