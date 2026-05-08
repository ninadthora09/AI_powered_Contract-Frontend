import { Box, Container } from "@mui/material";
import { motion as M} from "framer-motion";

const AppLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0B0F19 0%, #0E1425 50%, #0B0F19 100%)",
        position: "relative",
        overflowY: "auto",
        
        // Custom modern scrollbar
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "linear-gradient(180deg, #3B82F6, #8B5CF6)",
          borderRadius: "10px",
          "&:hover": {
            background: "linear-gradient(180deg, #60A5FA, #A78BFA)",
          },
        },
      }}
    >
      {/* Decorative gradient orbs */}
      <Box
        sx={{
          position: "fixed",
          top: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "fixed",
          bottom: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(236,72,153,0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          px: { xs: 2, sm: 3, md: 5, lg: 8 },
          py: { xs: 2.5, md: 4, lg: 5 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <M.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </M.div>
      </Container>
    </Box>
  );
};

export default AppLayout;