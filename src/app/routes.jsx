import { Routes, Route } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import UploadContract from "../pages/upload/UploadContract";
import RiskReport from "../pages/reports/RiskReport";
import ProtectedRoute from "./ProtectedRoute";
import ContractAnalysis from "../components/contract/ContractAnalysis";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

       {/* <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadContract />
          </ProtectedRoute>
        }
      />  */}

      <Route
        path="/reports/:id"
        element={
          <ProtectedRoute>
            <RiskReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contracts/:id/analysis"
        element={
          <ProtectedRoute>
            <ContractAnalysis />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
