import { Box, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip, Skeleton } from "@mui/material";
import { motion as M } from "framer-motion";
import DescriptionIcon from "@mui/icons-material/Description";
import WarningIcon from "@mui/icons-material/Warning";

const riskConfig = {
  High: { color: "error", icon: <WarningIcon sx={{ fontSize: 14 }} />, label: "High Risk" },
  Medium: { color: "warning", label: "Medium Risk" },
  Low: { color: "success", label: "Low Risk" },
  Pending: { color: "info", label: "Pending" },
};

const ContractList = ({ contracts = [], loading = false }) => {
  const safeContracts = Array.isArray(contracts) ? contracts : [];

  if (loading) {
    return (
      <Card sx={{ borderRadius: "24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <CardContent sx={{ p: 4 }}>
          {[1, 2, 3].map(i => (
            <Box key={i} sx={{ mb: 2 }}>
              <Skeleton variant="text" width="60%" height={32} sx={{ bgcolor: "rgba(255,255,255,0.05)" }} />
              <Skeleton variant="text" width="40%" height={24} sx={{ bgcolor: "rgba(255,255,255,0.05)" }} />
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <M.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
      <Card sx={{
        borderRadius: "24px",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "all 0.3s ease",
        "&:hover": { borderColor: "rgba(255,255,255,0.12)" }
      }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          {/* Header */}
          <Box mb={4}>
            <Typography sx={{ fontSize: "1.3rem", fontWeight: 700, color: "#FFF", mb: 1 }}>
              Recent Activity
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "#9CA3AF" }}>
              Last {safeContracts.length} contracts analyzed by AI
            </Typography>
          </Box>

          {/* Content */}
          {safeContracts.length === 0 ? (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <DescriptionIcon sx={{ fontSize: 48, color: "rgba(255,255,255,0.2)", mb: 2 }} />
              <Typography sx={{ color: "#9CA3AF", fontWeight: 500 }}>No contracts yet</Typography>
              <Typography sx={{ color: "#6B7280", fontSize: "0.85rem", mt: 1 }}>
                Upload your first contract to get started
              </Typography>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#9CA3AF", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    Contract Name
                  </TableCell>
                  <TableCell sx={{ color: "#9CA3AF", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    Date
                  </TableCell>
                  <TableCell align="right" sx={{ color: "#9CA3AF", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {safeContracts.slice(0, 5).map((contract, idx) => {
                  const risk = contract.status === "analyzed" && contract.riskLevel ? contract.riskLevel : "Pending";
                  const config = riskConfig[risk] || riskConfig.Pending;
                  const date = contract.createdAt ? new Date(contract.createdAt).toLocaleDateString() : "—";
                  
                  return (
                    <TableRow 
                      key={contract._id || idx}
                      sx={{
                        transition: "all 0.2s ease",
                        "&:hover": { 
                          background: "rgba(255,255,255,0.04)",
                          transform: "translateX(4px)"
                        }
                      }}
                    >
                      <TableCell sx={{ color: "#FFF", fontWeight: 600, fontSize: "0.95rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        {contract.fileName || contract.name || "Untitled"}
                      </TableCell>
                      <TableCell sx={{ color: "#9CA3AF", fontSize: "0.85rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        {date}
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <Chip
                          icon={config.icon}
                          label={config.label}
                          size="small"
                          color={config.color}
                          sx={{
                            fontWeight: 600,
                            borderRadius: "12px",
                            ...(risk === "Pending" && {
                              animation: "pulse 2s infinite",
                              bgcolor: "rgba(59,130,246,0.2)",
                            })
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}

          {/* View all link */}
          {safeContracts.length > 5 && (
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography sx={{ 
                color: "#60A5FA", 
                fontSize: "0.85rem", 
                cursor: "pointer",
                "&:hover": { color: "#93C5FD" }
              }}>
                View all {safeContracts.length} contracts →
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </M.div>
  );
};

export default ContractList;