import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { createTransfer } from "@/services/createTransfer";
import { useDashboardStore } from "@/store/useDashboardStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { transferSchema, type TransferFormData } from "./transferSchema";

export default function Transfer() {
  const navigate = useNavigate();
  const { transfer, balance } = useDashboardStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createTransfer,
    onSuccess: (data) => {
      transfer(data.amount, data.title);
      navigate("/home");
    },
  });

  function onSubmit(data: TransferFormData) {
    if (data.amount > balance) {
      return alert("Saldo insuficiente");
    }

    mutate(data);
  }

  return (
    <div className="p-12 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Transferência</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Descrição"
          placeholder="Ex: Mercado"
          registration={register("title")}
          error={errors.title}
        />

        <FormField
          label="Valor"
          type="number"
          placeholder="0.00"
          registration={register("amount", { valueAsNumber: true })}
          error={errors.amount}
        />

        <Button type="submit" className="w-full">
          {isPending ? "Transferindo..." : "Transferir"}
        </Button>
      </form>
    </div>
  );
}
