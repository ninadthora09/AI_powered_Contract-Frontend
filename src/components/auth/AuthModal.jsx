import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const AuthModal = ({ open, onClose, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: "#0F172A",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          sx={{ p: 4, position: "relative" }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "#94A3B8",
            }}
          >
            <CloseIcon />
          </IconButton>

          {children}
        </MotionBox>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
