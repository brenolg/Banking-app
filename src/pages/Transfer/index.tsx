import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        <div>
          <Input placeholder="Descrição" {...register("title")} />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="Valor"
            type="number"
            step="0.01"
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          {isPending ? "Transferindo..." : "Transferir"}
        </Button>
      </form>
    </div>
  );
}
