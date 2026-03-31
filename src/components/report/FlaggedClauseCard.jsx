import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";

const FlaggedClauseCard = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Termination Clause
          </Typography>
          <Chip label="High Risk" color="error" size="small" />
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          Either party may terminate this agreement at any time without cause,
          subject to a 90-day notice period.
        </Typography>

        <Typography variant="body2">
          This clause increases risk because it allows unilateral termination
          without compensation safeguards, potentially disrupting business
          continuity.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FlaggedClauseCard;
