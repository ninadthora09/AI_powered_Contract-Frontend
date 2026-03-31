import { Box, Stack, Button, Dialog } from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AppLayout from "../../components/layout/AppLayout";
import StatsCard from "../../components/dashboard/StatsCard";
import ContractList from "../../components/dashboard/ContractList";
import UploadContract from "../upload/UploadContract";
import { getMyContracts } from "../../services/contract.service";

const Dashboard = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await getMyContracts();
        setContracts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContracts();
  }, []);

  return (
    <AppLayout>
      {/* ACTION BAR */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 6 }}>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Stack direction="row" spacing={3}>
            <Button
              startIcon={<AddIcon />}
              onClick={() => setOpenUpload(true)}
            >
              New Contract
            </Button>

            <Button startIcon={<AssessmentIcon />}>Reports</Button>
            <Button startIcon={<AssessmentIcon />}>Podcasts</Button>
          </Stack>
        </Box>

        <Button
          startIcon={<LogoutIcon />}
          onClick={() => {
            localStorage.clear();
            setContracts([]);
            window.location.replace("/");
          }}
        >
          Logout
        </Button>
      </Box>

      {/* CONTENT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 6,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <StatsCard contracts={contracts} />
        </Box>
        <Box sx={{ flex: 2 }}>
          <ContractList contracts={contracts.slice(0, 5)} />
        </Box>
      </Box>

      {/* 🔥 FIXED UPLOAD MODAL */}
      <Dialog
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        maxWidth={false}
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            overflow: "visible",
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(2,6,23,0.75)",
            backdropFilter: "blur(8px)",
          },
        }}
      >
        <UploadContract
          onClose={() => setOpenUpload(false)}
          onSuccess={async () => {
            const data = await getMyContracts();
            setContracts(data.contracts);
          }}
        />
      </Dialog>
    </AppLayout>
  );
};

export default Dashboard;
