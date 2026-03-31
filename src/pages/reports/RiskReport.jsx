import { Grid, Typography } from "@mui/material";
import AppLayout from "../../components/layout/AppLayout";
import RiskScoreOverview from "../../components/report/RiskScoreOverview";
import SummaryPanel from "../../components/report/SummaryPanel";
import FlaggedClauseCard from "../../components/report/FlaggedClauseCard";

const RiskReport = () => {
  return (
    <AppLayout>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Contract Risk Report
      </Typography>

      <Grid container spacing={3}>
        
        {/* Risk Overview */}
        <Grid item xs={12} md={4}>
          <RiskScoreOverview />
        </Grid>

        {/* Summary */}
        <Grid item xs={12} md={8}>
          <SummaryPanel />
        </Grid>

        {/* Flagged Clauses */}
        <Grid item xs={12}>
          <FlaggedClauseCard />
          <FlaggedClauseCard />
          <FlaggedClauseCard />
        </Grid>

      </Grid>
    </AppLayout>
  );
};

export default RiskReport;
