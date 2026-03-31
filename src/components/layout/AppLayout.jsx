import { Box, Container } from "@mui/material";

const AppLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0B0F19 0%, #0E1425 100%)",

        // ✅ let page flow naturally
        overflowY: "auto",
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          px: { xs: 2, md: 4 },
          py: { xs: 2.5, md: 3.5 },
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default AppLayout;
