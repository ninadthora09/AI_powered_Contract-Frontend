import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

const riskColor = {
  High: "error",
  Medium: "warning",
  Low: "success",
  Pending: "info",
};

const ContractList = ({ contracts }) => {
  // 🔐 SAFETY: ensure array
  const safeContracts = Array.isArray(contracts) ? contracts : [];

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: "22px",
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        {/* HEADER */}
        <Box mb={4}>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
              mb: 0.6,
            }}
          >
            Recent Activity
          </Typography>

          <Typography
            sx={{
              fontSize: "0.85rem",
              color: "#9CA3AF",
              maxWidth: 460,
              lineHeight: 1.7,
            }}
          >
            A live view of contracts recently uploaded and analyzed by your AI
            engine.
          </Typography>
        </Box>

        {/* EMPTY STATE */}
        {safeContracts.length === 0 ? (
          <Box
            sx={{
              py: 6,
              textAlign: "center",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            <Typography sx={{ fontSize: "0.95rem", fontWeight: 600 }}>
              No contracts yet
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", mt: 0.5 }}>
              Upload and analyze a contract to see it here.
            </Typography>
          </Box>
        ) : (
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell sx={headCellStyle}>Contract</TableCell>
                <TableCell sx={headCellStyle}>Uploaded</TableCell>
                <TableCell align="right" sx={headCellStyle}>
                  Risk
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {safeContracts.map((c, index) => {
                let risk = "Pending";

                if (c.status === "analyzed" && c.riskLevel) {
                  risk = c.riskLevel;
                }

                const date = c.createdAt
                  ? new Date(c.createdAt).toLocaleDateString()
                  : "—";

                return (
                  <TableRow
                    key={c._id || c.contractId || index}
                    hover
                    sx={{
                      transition: "all 0.25s ease",
                      "&:hover": {
                        background: "rgba(255,255,255,0.06)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    {/* NAME */}
                    <TableCell sx={nameCellStyle}>
                      {c.fileName || c.name || "Untitled Contract"}
                    </TableCell>

                    {/* DATE */}
                    <TableCell sx={dateCellStyle}>{date}</TableCell>

                    {/* RISK */}
                    <TableCell align="right" sx={riskCellStyle}>
                      <Chip
                        label={risk}
                        size="medium"
                        color={riskColor[risk] || "default"}
                        sx={{
                          fontWeight: 700,
                          ...(risk === "Pending" && {
                            animation: "pulse 1.5s infinite",
                            border: "1px dashed rgba(255,255,255,0.4)",
                          }),
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

/* 🎨 shared styles */
const headCellStyle = {
  fontSize: "0.7rem",
  fontWeight: 600,
  color: "#9CA3AF",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  borderBottom: "1px solid rgba(255,255,255,0.12)",
  pb: 1.8,
};

const nameCellStyle = {
  fontSize: "1.05rem",
  fontWeight: 700,
  color: "#E5E7EB",
  py: 2.4,
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const dateCellStyle = {
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "#9CA3AF",
  py: 2.4,
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const riskCellStyle = {
  py: 2.4,
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

export default ContractList;
