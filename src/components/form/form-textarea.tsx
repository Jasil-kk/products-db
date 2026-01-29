import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

type Props = {
  label: string;
  error?: FieldError;
  required?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function FormTextarea({
  label,
  error,
  required,
  className,
  ...props
}: Props) {
  return (
    <div className="space-y-1">
      <Label className="mb-2">
        {label}
        {required && (
          <span className="-ml-1 text-destructive font-open-sans">*</span>
        )}
      </Label>

      <Textarea
        {...props}
        className={cn(error && "border-destructive", className)}
      />

      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  );
}
