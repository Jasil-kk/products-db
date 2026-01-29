"use client";

import { useState } from "react";
import { useProductsContext } from "@/context/ProductsContext";
import { ProductData } from "@/types/product";
import { useRouter } from "next/navigation";

export function useSingleProduct() {
  const router = useRouter();
  const { products, editProductById, deleteProductById } = useProductsContext();

  const [buttonLoading, setButtonLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductData | null>(null);

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
      router.push("/");
    } finally {
      setButtonLoading(false);
    }
  };

  const openEditModal = (data: ProductData) => {
    setEditProduct(data);
    setShowEditModal(true);
  };

  const closeAddModal = () => {
    setShowEditModal(false);
    setEditProduct(null);
  };

  // edit function
  const handleEdit = async (data: ProductData) => {
    setButtonLoading(true);
    try {
      if (editProduct && editProduct.id) {
        await editProductById(editProduct.id, data);
      }
      closeAddModal();
    } finally {
      setButtonLoading(false);
    }
  };

  return {
    products,
    buttonLoading,
    handleDelete,
    deleteId,
    openDeleteConfirm,
    closeDeleteConfirm,
    showEditModal,
    openEditModal,
    closeAddModal,
    handleEdit,
    editProduct,
  };
}
