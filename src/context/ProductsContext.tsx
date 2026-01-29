"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/services/api/product.api";
import { ProductData } from "@/types/product";

interface ProductsContextProps {
  products: ProductData[];
  loading: boolean;
  setProducts: (products: ProductData[]) => void;
  refreshProducts: () => Promise<void>;
  addNewProduct: (data: ProductData) => Promise<void>;
  editProductById: (id: number, data: ProductData) => Promise<void>;
  deleteProductById: (id: number) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined,
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res);
    } finally {
      setLoading(false);
    }
  };

  const addNewProduct = async (data: ProductData) => {
    const created = await addProduct(data);
    setProducts((prev) => [created, ...prev]);
  };

  const editProductById = async (id: number, data: ProductData) => {
    const updated = await updateProduct(id, data);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              title: updated.title ?? p.title,
              price: updated.price ?? p.price,
              description: updated.description ?? p.description,
              image: updated.image ?? p.image,
              category: updated.category ?? p.category,
            }
          : p,
      ),
    );
  };

  const deleteProductById = async (id: number) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        setProducts,
        refreshProducts,
        addNewProduct,
        editProductById,
        deleteProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error("useProductsContext must be used within ProductsProvider");
  return context;
};
