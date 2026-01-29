"use client";

import { useMemo, useState } from "react";
import { paginate } from "@/utils/paginate";
import { useProductsContext } from "@/context/ProductsContext";
import { ProductData } from "@/types/product";

export function useProducts() {
  const {
    products,
    loading,
    addNewProduct,
    editProductById,
    deleteProductById,
  } = useProductsContext();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductData | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  // filter function
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory = category === "all" || product.category === category;

      const matchPrice =
        (minPrice === null || product.price >= minPrice) &&
        (maxPrice === null || product.price <= maxPrice);

      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, search, category, minPrice, maxPrice]);

  const paginated = useMemo(
    () => paginate(filteredProducts, page, limit),
    [filteredProducts, page, limit],
  );

  const openDeleteConfirm = (id: number) => {
    setDeleteId(id);
  };

  const closeDeleteConfirm = () => {
    setDeleteId(null);
  };

  // delete function
  const handleDelete = async () => {
    if (!deleteId) return;

    setButtonLoading(true);
    try {
      await deleteProductById(deleteId);
      closeDeleteConfirm();
    } finally {
      setButtonLoading(false);
    }
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const openEditModal = (data: ProductData) => {
    setEditProduct(data);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setEditProduct(null);
  };

  // add/edit function
  const handleAddEdit = async (data: ProductData) => {
    setButtonLoading(true);
    try {
      if (editProduct && editProduct.id) {
        await editProductById(editProduct.id, data);
      } else {
        await addNewProduct(data);
      }
      closeAddModal();
    } finally {
      setButtonLoading(false);
    }
  };

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
    buttonLoading,
    handleDelete,
    deleteId,
    openDeleteConfirm,
    closeDeleteConfirm,
    showAddModal,
    openAddModal,
    closeAddModal,
    handleAddEdit,
    editProduct,
    openEditModal,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
  };
}
