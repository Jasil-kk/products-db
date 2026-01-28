import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ProductData } from "@/types/product";
import Image from "next/image";

type Props = {
  data: ProductData[];
};

export function ProductTable({ data }: Props) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((product) => {
            const stock = product.rating.count;
            const status = stock > 0 ? "Active" : "Inactive";

            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                    <p>{product.title}</p>
                  </div>
                </TableCell>

                <TableCell className="capitalize">{product.category}</TableCell>

                <TableCell className="font-open-sans">
                  ₹{product.price}
                </TableCell>

                <TableCell className="font-open-sans">{stock}</TableCell>

                <TableCell>
                  <Badge variant={status === "Active" ? "success" : "warning"}>
                    {status}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
