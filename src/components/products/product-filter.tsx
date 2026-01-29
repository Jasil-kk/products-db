import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_CATEGORIES } from "@/constants/categories";
import { Button } from "@/components/ui/button";
import { DismissableLayer } from "@radix-ui/react-dismissable-layer";

type Props = {
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  onApply: (values: {
    category: string;
    minPrice: number | null;
    maxPrice: number | null;
  }) => void;
  onClose: () => void;
};

export function ProductFilter({
  category,
  minPrice,
  maxPrice,
  onApply,
  onClose,
}: Props) {
  const [localCategory, setLocalCategory] = useState(category);
  const [localMinPrice, setLocalMinPrice] = useState<number | null>(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState<number | null>(maxPrice);

  return (
    <DismissableLayer onDismiss={onClose}>
      <div className="absolute right-0 z-50 mt-2 w-64 space-y-4 rounded-md border bg-background p-4 shadow-lg">
        {/* Category */}
        <div className="space-y-1">
          <p className="text-sm font-medium">Category</p>
          <Select value={localCategory} onValueChange={setLocalCategory}>
            <SelectTrigger className="w-full capitalize">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              {PRODUCT_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat} className="capitalize">
                  {cat === "all" ? "All Categories" : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price range */}
        <div className="space-y-1">
          <p className="text-sm font-medium">Price range</p>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={localMinPrice ?? ""}
              onChange={(e) =>
                setLocalMinPrice(e.target.value ? Number(e.target.value) : null)
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={localMaxPrice ?? ""}
              onChange={(e) =>
                setLocalMaxPrice(e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => {
              setLocalCategory("all");
              setLocalMinPrice(null);
              setLocalMaxPrice(null);
            }}
          >
            Reset
          </Button>

          <Button
            size="sm"
            className="flex-1"
            onClick={() => {
              onApply({
                category: localCategory,
                minPrice: localMinPrice,
                maxPrice: localMaxPrice,
              });
              onClose();
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </DismissableLayer>
  );
}
