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
import { cn } from "@/lib/utils";

type FormSelectProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: string[];
  placeholder?: string;
  error?: { message?: string };
  required?: boolean;
};

export function FormSelect<T extends FieldValues>({
  label,
  name,
  control,
  options,
  placeholder = "Select an option",
  error,
  required,
}: FormSelectProps<T>) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label className="mb-1">
        {label}
        {required && (
          <span className="-ml-1 text-destructive font-open-sans">*</span>
        )}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const value = field.value ?? "";

          return (
            <Select value={value} onValueChange={field.onChange}>
              <SelectTrigger
                className={cn(
                  error && "border-destructive",
                  "w-full capitalize",
                )}
              >
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
          );
        }}
      />

      {error?.message && (
        <span className="text-xs text-destructive">{error.message}</span>
      )}
    </div>
  );
}
