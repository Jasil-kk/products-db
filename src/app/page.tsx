"use client";

import { useProducts } from "@/hooks/use-products";
import { ProductTable } from "@/components/products/product-table";
import { ProductTableToolbar } from "@/components/products/product-table-toolbar";
import { ProductTablePagination } from "@/components/products/product-table-pagination";
import { ProductEmptyState } from "@/components/products/product-empty-state";
import { ProductTableSkeleton } from "@/components/products/product-table-skeleton";

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
  } = useProducts();

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Products</h1>

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
          <ProductTable data={products} />
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
    </main>
  );
}
