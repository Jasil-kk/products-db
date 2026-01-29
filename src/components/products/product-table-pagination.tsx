import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Props = {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export function ProductTablePagination({
  total,
  page,
  limit,
  onPageChange,
  onLimitChange,
}: Props) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-background p-2 rounded-lg">
      <p className="text-sm text-muted-foreground font-open-sans">
        Showing <span className="font-medium">{start}</span>
        {" - "}
        <span className="font-medium">{end}</span> of{" "}
        <span className="font-medium">{total}</span> products
      </p>

      <div className="flex items-center gap-4">
        <Select
          value={String(limit)}
          onValueChange={(value) => {
            onLimitChange(Number(value));
            onPageChange(1);
          }}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
