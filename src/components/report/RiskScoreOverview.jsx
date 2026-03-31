import { Card, CardContent, Typography, Box } from "@mui/material";

const RiskScoreOverview = () => {
  const score = 78;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          Overall Risk Score
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h2" fontWeight={700} color="error.main">
            {score}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            High Risk Contract
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RiskScoreOverview;
