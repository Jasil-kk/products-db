"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues } from "@/schemas/product.schema";
import { FormInput } from "@/components/form/form-input";
import { PRODUCT_CATEGORIES } from "@/constants/categories";
import { FormSelect } from "../form/form-select";
import { FormTextarea } from "../form/form-textarea";

type Props = {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  loading?: boolean;
};

export function ProductForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: NaN,
      image: "",
      category: "",
      description: "",
      ...defaultValues,
    },
  });

  return (
    <form
      id="product-form"
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 space-y-4"
    >
      <FormInput
        label="Title"
        {...register("title")}
        error={errors.title}
        required
      />

      <FormInput
        label="Price"
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0"
        {...register("price", { valueAsNumber: true })}
        error={errors.price}
        required
      />

      <FormInput
        label="Image URL"
        {...register("image")}
        error={errors.image}
        required
      />

      <FormSelect
        label="Category"
        name="category"
        control={control}
        options={PRODUCT_CATEGORIES.filter((c) => c !== "all")}
        error={errors.category}
        required
      />

      <FormTextarea
        label="Description"
        rows={4}
        {...register("description")}
        error={errors.description}
        required
      />
    </form>
  );
}
