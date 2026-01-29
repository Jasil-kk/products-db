import { ArrowLeft, Package } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function ProductSingleEmptyState() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Package className="h-10 w-10 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">Oops! Product not found.</h3>
      <Button
        onClick={() => router.push("/")}
        className="mt-5"
        variant={"outline"}
      >
        <ArrowLeft size={16} />
        Back to products
      </Button>
    </div>
  );
}
