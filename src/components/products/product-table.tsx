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
import { Edit, Star, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  data: ProductData[];
  deleteClick: (id: number) => void;
  editClick: (data: ProductData) => void;
};

export function ProductTable({ data, deleteClick, editClick }: Props) {
  const router = useRouter();

  return (
    <>
      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="font-semibold pl-4">Product</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Rating</TableHead>
              <TableHead className="text-right font-semibold pr-4">
                Actions
              </TableHead>
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
                  <TableCell className="font-medium pl-4">
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
                  <TableCell>
                    {product.rating ? (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground font-open-sans">
                        <Star
                          className="fill-yellow-400 text-yellow-400"
                          size={16}
                        />
                        <span>{product.rating.rate}</span>
                        <span className="text-xs">
                          ({product.rating.count})
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">
                        No ratings yet
                      </span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell
                    className="text-right pr-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-2">
                      {/* Edit */}
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          editClick(product);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      {/* Delete */}
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!product?.id) return;
                          deleteClick(product.id);
                        }}
                        className="text-destructive hover:text-destructive/90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
