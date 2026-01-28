import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

type Props = {
  label: string;
  error?: FieldError;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function FormTextarea({ label, error, className, ...props }: Props) {
  return (
    <div className="space-y-1">
      <Label className="mb-2">{label}</Label>

      <Textarea
        {...props}
        className={cn(error && "border-destructive", className)}
      />

      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  );
}
