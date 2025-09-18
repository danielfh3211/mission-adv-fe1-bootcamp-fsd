import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT = "/products";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Read
export const getProducts = async () => {
  try {
    const response = await api.get(ENDPOINT);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Create
export const createProduct = async (data) => {
  try {
    const response = await api.post(ENDPOINT, data);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Update
export const updateProduct = async (id, data) => {
  try {
    const response = await api.put(`${ENDPOINT}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
