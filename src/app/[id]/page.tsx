"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/api/product.api";
import Link from "next/link";
import { ArrowLeft, Edit, Star, Trash2 } from "lucide-react";
import { ClientImage } from "@/components/client-image";
import ProductDetailsLoading from "./loading";
import { useSingleProduct } from "@/hooks/use-single-product";
import { ProductData } from "@/types/product";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/page-loader";
import { ProductFormDialog } from "@/components/products/ProductFormDialog";
import { DeleteProductDialog } from "@/components/products/delete-product-dialog";
import { ProductSingleEmptyState } from "@/components/products/product-single-empty-state";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  const {
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
  } = useSingleProduct();

  useEffect(() => {
    if (!id) return;

    const numericId = Number(id);

    const localProduct = products.find((p) => p.id === numericId);
    if (localProduct) {
      setProduct(localProduct);
      setLoading(false);
      return;
    }

    getProductById(numericId)
      .then((res) => setProduct(res || null))
      .finally(() => setLoading(false));
  }, [id, products]);

  if (loading) return <ProductDetailsLoading />;

  if (!product) {
    return <ProductSingleEmptyState />;
  }

  return (
    <>
      <div className="">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to products
        </Link>

        <div className="mt-5 w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10">
          <div className="w-full h-fit bg-background rounded-md p-5">
            <ClientImage
              src={product.image}
              alt={product.title}
              className="w-full aspect-square max-h-96 object-contain"
            />
          </div>
          <div>
            <div className="flex items-center justify-end gap-3">
              {/* Edit */}
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => openEditModal(product)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit className="h-4 w-4" />
              </Button>

              {/* Delete */}
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => {
                  if (!product?.id) return;
                  openDeleteConfirm(product.id);
                }}
                className="text-destructive hover:text-destructive/90"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <h1 className="mt-5 text-2xl font-semibold">{product.title}</h1>
            <p className="mt-5 font-open-sans text-slate-600 dark:text-gray-400">
              {product.description}
            </p>
            <div className="mt-10 w-full flex justify-between gap-5 flex-wrap">
              <p className="text-2xl font-semibold font-open-sans">
                ₹{product.price}
              </p>
              {product.rating && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-open-sans">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">
                      {product.rating.rate}
                    </span>
                  </div>
                  <span>({product.rating.count} reviews)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <ProductFormDialog
          open={showEditModal}
          onClose={closeAddModal}
          onSubmit={handleEdit}
          defaultValues={editProduct || undefined}
          title={"Edit Product"}
          loading={loading}
        />

        <DeleteProductDialog
          open={!!deleteId}
          onClose={closeDeleteConfirm}
          onSubmit={handleDelete}
        />
      </div>
      {buttonLoading && <PageLoader />}
    </>
  );
}
