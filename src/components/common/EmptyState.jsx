import { Box, Typography, Button } from "@mui/material";

const EmptyState = ({ title, subtitle, actionLabel, onAction }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        color: "text.secondary",
      }}
    >
      <Typography variant="h6" mb={1}>
        {title}
      </Typography>
      <Typography variant="body2" mb={3}>
        {subtitle}
      </Typography>

      {actionLabel && (
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
