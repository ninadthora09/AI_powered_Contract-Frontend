import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const PdfPreview = ({ file }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "60vh",
        maxHeight: "640px",
        borderRadius: "16px",
        background: "#05070D",
        border: "1px solid rgba(255,255,255,0.12)",
        overflow: "hidden", // hides iframe scrollbars
        position: "relative",
      }}
    >
      {previewUrl && (
        <iframe
          src={`${previewUrl}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
          title="PDF Preview"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
        />
      )}

      {/* SCROLLBAR MASK (visual removal) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "14px",
          height: "100%",
          background: "#05070D",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default PdfPreview;
