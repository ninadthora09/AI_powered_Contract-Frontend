import { Card, CardContent, Typography, Divider } from "@mui/material";

const SummaryPanel = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          AI Summary
        </Typography>

        <Typography variant="body2" paragraph>
          The contract contains multiple clauses that expose the signing party to
          financial and operational risk. Certain obligations are defined broadly
          without clear limitation or exit conditions.
        </Typography>

        <Typography variant="body2" paragraph>
          Termination conditions favor the counterparty and may result in penalties
          even in cases of non-material breach. Liability limitations are either
          missing or insufficiently defined.
        </Typography>

        <Typography variant="body2">
          It is recommended to review indemnity, termination, and payment clauses
          before proceeding with execution.
        </Typography>

        <Divider sx={{ mt: 2 }} />
      </CardContent>
    </Card>
  );
};

export default SummaryPanel;
