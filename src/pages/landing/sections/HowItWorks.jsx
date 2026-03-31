import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Contract Submission",
    desc: "Upload your legal document securely in PDF format. No configuration or manual setup required.",
    highlight: true,
  },
  {
    step: "02",
    title: "Automated Legal Review",
    desc: "The system analyzes clauses, obligations, and potential risks using advanced AI models.",
    highlight: true,
  },
  {
    step: "03",
    title: "Risk & Obligation Report",
    desc: "A structured report is generated, presenting findings in clear, understandable language.",
    highlight: true,
  },
  {
    step: "04",
    title: "Audio Risk Briefing",
    desc: "An optional AI-generated audio summary enables quick understanding while multitasking.",
    highlight: true,
  },
];

const HowItWorks = () => {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: "#0B0F1A",
      }}
    >
      <Container maxWidth="md">
        {/* HEADER */}
        <Stack spacing={2} textAlign="center" mb={8}>
          <Typography
            variant="overline"
            sx={{
              color: "#F472B6",
              letterSpacing: 1.5,
              fontWeight: 600,
            }}
          >
            How It Works
          </Typography>

          <Typography
            variant="h3"
            sx={{
              color: "#ac71d9",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            A simple, transparent review process
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              maxWidth: 520,
              lineHeight: 1.7,
              textAlign: "center",

              transform: "translate(160px, -10px)", // ← change numbers freely
            }}
          >
            SwiftContract AI streamlines contract analysis by combining legal
            intelligence with clear, actionable outputs.
          </Typography>
        </Stack>

        {/* TIMELINE */}
        <Stack spacing={5}>
          {steps.map((step, index) => (
            <Grid
              key={index}
              container
              spacing={3}
              component={motion.div}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* STEP NUMBER */}
              <Grid item xs={12} md={2}>
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: step.highlight ? "#A78BFA" : "#64748B",
                  }}
                >
                  {step.step}
                </Typography>
              </Grid>

              {/* CONTENT */}
              <Grid item xs={12} md={10}>
                <Stack spacing={1.2}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                    }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#94A3B8",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.desc}
                  </Typography>
                </Stack>
              </Grid>

              {index !== steps.length - 1 && (
                <Grid item xs={12}>
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />
                </Grid>
              )}
            </Grid>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default HowItWorks;
