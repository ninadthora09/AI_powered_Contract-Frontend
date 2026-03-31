import api from "./api";
import axios from "axios";

// Upload contract
export const uploadContract = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/contracts/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// 🔥 SINGLE SOURCE OF TRUTH (AI + RAG)
export const analyzeContract = async (contractId) => {
  const res = await api.post(`/contracts/${contractId}/analyze`);
  return res.data;
};

// 🔁 Alias for report (keeps UI simple)
export const getRiskReport = async (contractId) => {
  return analyzeContract(contractId);
};

export const getMyContracts = async () => {
  const res = await api.get("/contracts");
  return res.data.contracts;
};




