import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = Readonly<{
  label: string;
  placeholder?: string;
  type?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}>;

export function FormField({
  label,
  placeholder,
  type = "text",
  error,
  registration,
}: Props) {
  const id = registration.name;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <Input id={id} type={type} placeholder={placeholder} {...registration} />

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
