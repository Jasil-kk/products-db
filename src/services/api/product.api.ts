import api from "./axios";
import { ProductData } from "@/types/product";

export const getProducts = async (): Promise<ProductData[]> => {
  const res = await api.get<ProductData[]>("/products");
  return res.data;
};
