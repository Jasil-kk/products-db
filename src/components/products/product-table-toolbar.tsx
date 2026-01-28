import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_CATEGORIES } from "@/constants/categories";

type Props = {
  search: string;
  onSearch: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
};

export function ProductTableToolbar({
  search,
  onSearch,
  category,
  onCategoryChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="md:w-72"
      />

      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-48 capitalize">
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
  );
}
