"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ProductForm } from "./product-form";
import { Button } from "@/components/ui/button";
import { ProductFormValues } from "@/schemas/product.schema";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  defaultValues?: Partial<ProductFormValues>;
  title?: string;
  loading?: boolean;
};

export function ProductFormDialog({
  open,
  onClose,
  onSubmit,
  defaultValues,
  title = "Add Product",
  loading,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <ProductForm defaultValues={defaultValues} onSubmit={onSubmit} />

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            type="submit"
            form="product-form"
            className="min-w-25"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
