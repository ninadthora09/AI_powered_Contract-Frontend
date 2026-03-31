import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Chip,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import aboutVisual from "../../../assets/icons/Chat bot-amico.png";

/**
 * Hero is a PRESENTATIONAL component.
 * It does NOT handle auth or navigation logic.
 */
export default function Hero({ onUpload, onDashboard }) {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      sx={{
        pt: "96px",
        background: `
          radial-gradient(600px 300px at 20% 10%, rgba(244,114,182,0.18), transparent),
          radial-gradient(600px 300px at 80% 10%, rgba(79,140,255,0.18), transparent),
          #0B0F1A
        `,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{ flexWrap: "nowrap" }}
        >
          {/* LEFT — CONTENT */}
          <Grid item xs={12} md={6}>
            <Stack
              spacing={3}
              component={motion.div}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Badge */}
              <Chip
                label="AI Contract Intelligence"
                sx={{
                  width: "fit-content",
                  bgcolor: "rgba(244,114,182,0.15)",
                  color: "#F472B6",
                  fontWeight: 500,
                  borderRadius: "10px",
                }}
              />

              {/* Headline */}
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "#FFFFFF",
                  maxWidth: "850px",
                }}
              >
                Understand the Contract
                <br />
                <Box component="span" sx={{ color: "#4F8CFF" }}>
                  Before It Understands You.
                </Box>
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h6"
                sx={{
                  color: "#B3B3C6",
                  maxWidth: "620px",
                  lineHeight: 1.6,
                }}
              >
                SwiftContract AI reads contracts for you, detects hidden risks,
                unfair clauses, and obligations — explained in plain English.
              </Typography>

              {/* CTA BUTTONS */}
              <Stack direction="row" spacing={2} mt={1}>
                <Button
                  size="large"
                  onClick={onUpload}
                  sx={{
                    px: 4,
                    py: 1.4,
                    borderRadius: "14px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#0B0F1A",
                    background:
                      "linear-gradient(135deg, #F472B6 0%, #4F8CFF 100%)",
                    boxShadow: "0 10px 30px rgba(244,114,182,0.35)",
                    "&:hover": { opacity: 0.9 },
                  }}
                >
                  Upload Contract
                </Button>

                <Button
                  size="large"
                  variant="outlined"
                  onClick={onDashboard}
                  sx={{
                    px: 4,
                    py: 1.4,
                    borderRadius: "14px",
                    color: "#FFFFFF",
                    borderColor: "rgba(255,255,255,0.25)",
                    "&:hover": {
                      borderColor: "#F472B6",
                    },
                  }}
                >
                  Dashboard
                </Button>
              </Stack>

              {/* MINI HOW IT WORKS */}
              <Stack direction="row" spacing={3} mt={3}>
                {["Upload", "AI Analysis", "Clear Summary"].map((step, i) => (
                  <Box
                    key={i}
                    sx={{
                      flex: 1,
                      p: 2,
                      borderRadius: "14px",
                      bgcolor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="#FFFFFF"
                      fontWeight={600}
                    >
                      {step}
                    </Typography>
                    <Typography variant="caption" color="#9CA3AF">
                      {i === 0 && "Upload any contract"}
                      {i === 1 && "Detect risks instantly"}
                      {i === 2 && "Plain English insights"}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              {/* TRUST LINE */}
              <Typography variant="caption" sx={{ color: "#7C7C8A", mt: 1 }}>
                No signup required • Secure • Free to try
              </Typography>
            </Stack>
          </Grid>

          {/* RIGHT — IMAGE */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={aboutVisual}
                alt="SwiftContract AI Preview"
                sx={{
                  width: "100%",
                  maxWidth: "480px",
                  filter:
                    "drop-shadow(0 30px 70px rgba(79,140,255,0.28))",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
