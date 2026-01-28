"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductData } from "@/types/product";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";

type Props = {
  data: ProductData[];
  deleteClick: (id: number) => void;
  editClick: (data: ProductData) => void;
};

export function ProductTable({ data, deleteClick, editClick }: Props) {
  const router = useRouter();

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((product) => {
              return (
                <TableRow
                  key={product.id}
                  onClick={() => router.push(`/${product.id}`)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-8 w-8 object-contain"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.png";
                        }}
                      />
                      <p className="line-clamp-1">{product.title}</p>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {product.category}
                  </TableCell>
                  <TableCell className="font-open-sans">
                    ₹{product.price}
                  </TableCell>
                  {/* Actions */}
                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          editClick(product);
                        }}
                        className="text-blue-500 hover:opacity-80 cursor-pointer"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteClick(product.id);
                        }}
                        className="text-destructive hover:opacity-80 cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
