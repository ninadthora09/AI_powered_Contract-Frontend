import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
} from "@mui/material";

const flags = [
  {
    level: "High Risk",
    color: "#EF4444",
    items: [
      "Unlimited liability clause",
      "Unilateral termination rights",
    ],
  },
  {
    level: "Medium Risk",
    color: "#F59E0B",
    items: [
      "Ambiguous payment timeline",
      "Jurisdiction not clearly defined",
    ],
  },
  {
    level: "Low Risk",
    color: "#22C55E",
    items: ["Standard confidentiality clause"],
  },
];

const FlagSummary = () => {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: "24px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(14px)",
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        {/* HEADER */}
        <Box mb={3}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            Flag Summary
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#9CA3AF",
            }}
          >
            Key clauses requiring your attention
          </Typography>
        </Box>

        {/* FLAGS */}
        <Stack spacing={3}>
          {flags.map((flag, idx) => (
            <Box key={idx}>
              {/* LEVEL */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                mb={1.5}
              >
                <Chip
                  label={flag.level}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    color: flag.color,
                    border: `1px solid ${flag.color}55`,
                    background: `${flag.color}15`,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#9CA3AF",
                  }}
                >
                  {flag.items.length} issue
                  {flag.items.length > 1 ? "s" : ""}
                </Typography>
              </Stack>

              {/* ITEMS */}
              <Stack spacing={1}>
                {flag.items.map((item, i) => (
                  <Typography
                    key={i}
                    sx={{
                      fontSize: "14px",
                      color: "#E5E7EB",
                      lineHeight: 1.6,
                      pl: 1,
                      borderLeft: `2px solid ${flag.color}55`,
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FlagSummary;
