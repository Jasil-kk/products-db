import api from "./axios";
import { ProductData } from "@/types/product";

export const getProducts = async (): Promise<ProductData[]> => {
  const res = await api.get<ProductData[]>("/products");
  return res.data;
};

export const getProductById = async (id: number): Promise<ProductData> => {
  const res = await api.get<ProductData>(`/products/${id}`);
  return res.data;
};

export const addProduct = async (
  payload: Omit<ProductData, "id" | "rating">,
): Promise<ProductData> => {
  const res = await api.post<ProductData>("/products", payload);
  return res.data;
};

export const updateProduct = async (
  id: number,
  payload: Omit<ProductData, "id" | "rating">,
): Promise<ProductData> => {
  const res = await api.put<ProductData>(`/products/${id}`, payload);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  await api.delete(`/products/${id}`);
};
