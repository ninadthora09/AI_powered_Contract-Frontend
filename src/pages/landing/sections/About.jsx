import { Box, Container, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import aboutVisual from "../../../assets/icons/Exams-rafiki.png";

const About = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh", // 🔥 full viewport
        display: "flex",
        alignItems: "center", // 🔥 vertical center
        justifyContent: "center", // 🔥 horizontal safety
        py: { xs: 10, md: 14 }, // reduced padding (important)
        background: `

          radial-gradient(700px 400px at 30% 20%, rgba(79,140,255,0.22), transparent),
          radial-gradient(600px 350px at 80% 70%, rgba(244,114,182,0.18), transparent),
          #0B0F1A
        `,
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${aboutVisual})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: { xs: "80%", md: "55%" },
          opacity: 0.18, // 🔥 subtle, classy
          pointerEvents: "none",
        }}
      />

      {/* DARK OVERLAY (for text readability) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(11,15,26,0.92) 35%, rgba(11,15,26,0.6) 100%)",
        }}
      />

      {/* CONTENT */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Stack
          spacing={4}
          sx={{
            ml: { xs: 0, md: "-100px" }, // 🔥 shifts text slightly LEFT
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#F472B6",
              letterSpacing: 2,
              fontWeight: 600,
            }}
          >
            ABOUT SWIFTCONTRACT
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#FFFFFF",
              maxWidth: 720,
            }}
          >
            Legal clarity,
            <br />
            <Box component="span" sx={{ color: "#4F8CFF" }}>
              before you commit.
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "#B3B3C6",
              fontSize: "18px",
              lineHeight: 1.8,
              maxWidth: 800,
            }}
          >
            Contracts are written for courts, not for people. Critical risks,
            hidden obligations, and unfair clauses are often buried deep inside
            dense legal language.
          </Typography>

          <Typography
            sx={{
              color: "#B3B3C6",
              fontSize: "18px",
              lineHeight: 1.8,
              maxWidth: 720,
            }}
          >
            SwiftContract AI reads contracts like a careful expert would —
            identifying risks, liabilities, and commitments — and explains them
            clearly in plain English, so you stay in control before signing.
          </Typography>

          {/* VALUE POINTS */}
          <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
            {[
              "Explainable AI",
              "Risk-first analysis",
              "Plain English insights",
            ].map((item, i) => (
              <Box
                key={i}
                sx={{
                  px: 2.2,
                  py: 0.9,
                  borderRadius: "999px",
                  bgcolor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#E5E7EB",
                  fontSize: "13.5px",
                  fontWeight: 500,
                }}
              >
                {item}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default About;
