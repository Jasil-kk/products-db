import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

type Props = {
  label: string;
  error?: FieldError;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function FormInput({ label, error, className, ...props }: Props) {
  return (
    <div className="space-y-1">
      <Label className="mb-2">{label}</Label>
      <Input
        {...props}
        className={cn(error && "border-destructive", className, "font-open-sans")}
      />
      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  );
}
