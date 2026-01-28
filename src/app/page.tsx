"use client";

import { useProducts } from "@/hooks/use-products";
import { ProductTable } from "@/components/products/product-table";
import { ProductTableToolbar } from "@/components/products/product-table-toolbar";
import { ProductTablePagination } from "@/components/products/product-table-pagination";
import { ProductEmptyState } from "@/components/products/product-empty-state";
import { ProductTableSkeleton } from "@/components/products/product-table-skeleton";
import { DeleteProductDialog } from "@/components/products/delete-product-dialog";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProductFormDialog } from "@/components/products/ProductFormDialog";

export default function Home() {
  const {
    products,
    total,
    page,
    limit,
    setPage,
    setLimit,
    search,
    setSearch,
    category,
    setCategory,
    loading,
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
    openEditModal
  } = useProducts();

  return (
    <>
      <main className="space-y-6">
        <div className="w-full flex items-center gap-5 flex-wrap justify-between">
          <h1 className="text-2xl font-semibold">Products</h1>
          <Button onClick={openAddModal}>Add Product</Button>
        </div>
        <ProductTableToolbar
          search={search}
          onSearch={setSearch}
          category={category}
          onCategoryChange={setCategory}
        />

        {loading ? (
          <ProductTableSkeleton rows={limit} />
        ) : products.length ? (
          <>
            <ProductTable data={products} deleteClick={openDeleteConfirm} editClick={openEditModal}/>
            <ProductTablePagination
              total={total}
              page={page}
              limit={limit}
              onPageChange={setPage}
              onLimitChange={setLimit}
            />
          </>
        ) : (
          <ProductEmptyState />
        )}

        <ProductFormDialog
          open={showAddModal}
          onClose={closeAddModal}
          onSubmit={handleAddEdit}
          defaultValues={editProduct || undefined}
          title={editProduct ? "Edit Product" : "Add Product"}
          loading={loading}
        />

        <DeleteProductDialog
          open={!!deleteId}
          onClose={closeDeleteConfirm}
          onSubmit={handleDelete}
        />
      </main>
      {buttonLoading && <PageLoader />}
    </>
  );
}
