import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProductFilter } from "./product-filter";

type Props = {
  search: string;
  onSearch: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;

  minPrice: number | null;
  maxPrice: number | null;
  onMinPriceChange: (value: number | null) => void;
  onMaxPriceChange: (value: number | null) => void;
};

export function ProductTableToolbar({
  search,
  onSearch,
  category,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: Props) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-background rounded-lg p-3">
      {/* Search */}
      <div className="relative md:w-72">
        <span className="absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground">
          <Search size={18} />
        </span>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Filters */}
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setShowFilters((p) => !p)}
          className="gap-2"
        >
          <Filter size={16} />
          Filters
        </Button>

        {showFilters && (
          <ProductFilter
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onClose={() => setShowFilters(false)}
            onApply={({ category, minPrice, maxPrice }) => {
              onCategoryChange(category);
              onMinPriceChange(minPrice);
              onMaxPriceChange(maxPrice);
            }}
          />
        )}
      </div>
    </div>
  );
}
