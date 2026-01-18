import apiClient from "./apiClient.js";

export const calculateSalary = async (payload) => {
    const response = await apiClient.post("/api/calculate", payload);
    return response.data;
};

export const compareSalary = async (payload) => {
    const response = await apiClient.post("/api/compare", payload);
    return response.data;
};
