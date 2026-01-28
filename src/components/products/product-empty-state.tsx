import { Package } from "lucide-react";

export function ProductEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
      <Package className="h-10 w-10 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">
        No products found
      </h3>
      <p className="text-sm text-muted-foreground mt-1">
        Products will appear here once added.
      </p>
    </div>
  );
}
