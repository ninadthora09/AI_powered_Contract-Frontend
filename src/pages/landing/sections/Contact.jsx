import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 12, md: 16 },
        background: `
          radial-gradient(240px 140px at 20% 25%, rgba(79,140,255,0.12), transparent),
          radial-gradient(260px 160px at 80% 35%, rgba(167,139,250,0.12), transparent),
          #0B0F1A
        `,
      }}
    >
      <Container maxWidth="md">
        <Stack
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          spacing={4.5}
          textAlign="center"
          sx={{
            p: { xs: 5, md: 7 },
            borderRadius: "32px",
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(18px)",
          }}
        >
          {/* Eyebrow */}
          <Typography
            variant="overline"
            sx={{
              color: "#93C5FD",
              fontWeight: 600,
              letterSpacing: 1.4,
            }}
          >
            Contact
          </Typography>

          {/* Heading */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
            }}
          >
            Discuss your contract with confidence
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              color: "#A5B4FC",
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: 500,

              transform: "translate(120px, -20px)",

              textAlign: "center",
            }}
          >
            Questions, feedback, or a quick walkthrough of SwiftContract AI?
            We’re here to help you evaluate contracts with clarity.
          </Typography>

          {/* CTA */}
          <Box>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4.5,
                py: 1.6,
                borderRadius: "999px",
                fontWeight: 600,
                textTransform: "none",
                background: "linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)",
                boxShadow: "0 10px 28px rgba(79,140,255,0.28)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%)",
                  boxShadow: "0 14px 36px rgba(79,140,255,0.38)",
                },
              }}
            >
              Contact us
            </Button>
          </Box>

          {/* Subtext */}
          <Typography
            sx={{
              fontSize: "13px",
              color: "#9CA3AF",
              letterSpacing: "0.02em",
            }}
          >
            Typical response time: within 24 hours
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Contact;
