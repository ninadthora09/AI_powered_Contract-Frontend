import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ label = "Processing..." }) => {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
};

export default Loader;
