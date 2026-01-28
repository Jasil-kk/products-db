"use client";

import { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/services/api/product.api";
import { paginate } from "@/utils/paginate";
import { ProductData } from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((res) => setProducts(res))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory = category === "all" || product.category === category;

      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  const paginated = useMemo(
    () => paginate(filteredProducts, page, limit),
    [filteredProducts, page, limit],
  );

  return {
    loading,
    products: paginated.data,
    total: paginated.total,
    page,
    limit,
    setPage,
    setLimit,
    search,
    setSearch,
    category,
    setCategory,
  };
}
