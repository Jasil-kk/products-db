"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

type FormSelectProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: string[];
  placeholder?: string;
  error?: { message?: string };
};

export function FormSelect<T extends FieldValues>({
  label,
  name,
  control,
  options,
  placeholder = "Select an option",
  error,
}: FormSelectProps<T>) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label className="font-medium mb-1">{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full capitalize">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="capitalize">
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {error?.message && (
        <span className="text-sm text-destructive">{error.message}</span>
      )}
    </div>
  );
}
