import { Box, Stack, Button, Dialog, Typography, IconButton, Badge } from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "../../components/layout/AppLayout";
import StatsCard from "../../components/dashboard/StatsCard";
import ContractList from "../../components/dashboard/ContractList";
import UploadContract from "../upload/UploadContract";
import { getMyContracts } from "../../services/contract.service";

const Dashboard = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("contracts");

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setLoading(true);
        const data = await getMyContracts();
        setContracts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const menuItems = [
    { id: "contracts", label: "Contracts", icon: <DashboardIcon /> },
    { id: "reports", label: "Reports", icon: <AssessmentIcon /> },
    { id: "podcasts", label: "Podcasts", icon: <PodcastsIcon /> },
  ];

  const TabContent = () => {
    if (activeTab === "contracts") {
      return (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 4 }}>
          <Box sx={{ flex: 1.2 }}><StatsCard contracts={contracts} loading={loading} /></Box>
          <Box sx={{ flex: 2.5 }}><ContractList contracts={contracts} loading={loading} /></Box>
        </Box>
      );
    }
    
    const comingSoon = {
      reports: { icon: <AssessmentIcon />, title: "Reports Dashboard", msg: "Advanced analytics coming soon! 📊", color: "#3B82F6" },
      podcasts: { icon: <PodcastsIcon />, title: "Legal Podcasts", msg: "Curated content for contract professionals 🎙️", color: "#8B5CF6" }
    }[activeTab];
    
    return (
      <Box sx={{ p: 6, textAlign: "center", borderRadius: "24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
        {comingSoon.icon}
        <Typography variant="h5" sx={{ color: "#fff", mt: 2, mb: 1 }}>{comingSoon.title}</Typography>
        <Typography sx={{ color: "#94A3B8" }}>{comingSoon.msg}</Typography>
      </Box>
    );
  };

  return (
    <AppLayout>
      {/* Navbar */}
      <Box component={motion.div} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        sx={{ mb: 6, p: 2, borderRadius: "24px", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.05)" }}>
        
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ width: 40, height: 40, borderRadius: "12px", background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography sx={{ fontWeight: 700, fontSize: 20 }}>C</Typography>
            </Box>
            <Typography sx={{ fontWeight: 600, background: "linear-gradient(135deg, #fff, #94A3B8)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>
              ContractFlow
            </Typography>
          </Box>

          {/* Tabs */}
          <Stack direction="row" spacing={1} sx={{ bgcolor: "rgba(0,0,0,0.3)", p: 0.5, borderRadius: "16px" }}>
            {menuItems.map((item) => (
              <Button key={item.id} startIcon={item.icon} onClick={() => setActiveTab(item.id)}
                sx={{
                  borderRadius: "12px", px: 3, py: 1,
                  color: activeTab === item.id ? "#fff" : "#94A3B8",
                  background: activeTab === item.id ? "linear-gradient(135deg, #3B82F6, #8B5CF6)" : "transparent",
                  "&:hover": { background: activeTab === item.id ? "linear-gradient(135deg, #3B82F6, #8B5CF6)" : "rgba(255,255,255,0.05)" }
                }}>
                {item.label}
              </Button>
            ))}
          </Stack>

          {/* Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton sx={{ color: "#94A3B8", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" } }}>
              <Badge badgeContent={3} sx={{ "& .MuiBadge-badge": { background: "#3B82F6" } }}><NotificationsNoneIcon /></Badge>
            </IconButton>
            
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenUpload(true)}
              sx={{
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", borderRadius: "14px", px: 3,
                boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
                "&:hover": { transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(59,130,246,0.4)" }
              }}>
              New Contract
            </Button>

            <Button startIcon={<LogoutIcon />} onClick={handleLogout}
              sx={{ color: "#94A3B8", "&:hover": { color: "#EF4444", bgcolor: "rgba(239,68,68,0.1)" } }}>
              Logout
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Welcome */}
      <Box sx={{ mb: 5 }}>
        <Typography component={motion.h1} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 700, background: "linear-gradient(135deg, #FFFFFF, #94A3B8)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", mb: 1 }}>
          Welcome back, 👋
        </Typography>
        <Typography component={motion.p} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}
          sx={{ color: "#94A3B8" }}>
          Here's what's happening with your contracts today.
        </Typography>
      </Box>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
          <TabContent />
        </motion.div>
      </AnimatePresence>

      {/* Upload Modal */}
      <Dialog open={openUpload} onClose={() => setOpenUpload(false)} maxWidth="md" fullWidth
        PaperProps={{ sx: { background: "linear-gradient(135deg, #0B0F19 0%, #0E1425 100%)", borderRadius: "28px", border: "1px solid rgba(255, 255, 255, 0.1)" } }}
        BackdropProps={{ sx: { backgroundColor: "rgba(2,6,23,0.85)", backdropFilter: "blur(12px)" } }}>
        <UploadContract onClose={() => setOpenUpload(false)} onSuccess={async () => { const data = await getMyContracts(); setContracts(data); }} />
      </Dialog>
    </AppLayout>
  );
};

export default Dashboard;