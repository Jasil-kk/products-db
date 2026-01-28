"use client";

import { useProductsContext } from "@/context/ProductsContext";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/api/product.api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClientImage } from "@/components/client-image";
import ProductDetailsLoading from "./loading";

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useProductsContext();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4 text-center">
        <p className="text-gray-500 text-lg">Oops! Product not found.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <ArrowLeft size={16} />
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to products
      </Link>

      <ClientImage
        src={product.image}
        alt={product.title}
        className="h-56 w-56 object-contain"
      />

      <h1 className="text-2xl font-semibold">{product.title}</h1>
      <p className="font-open-sans">{product.description}</p>
      <p className="font-medium font-open-sans">₹{product.price}</p>
    </div>
  );
}
