import { z } from "zod";

export const transferSchema = z.object({
  title: z.string().min(1, "Informe uma descrição"),
  amount: z.number("Valor inválido").positive("O valor deve ser maior que 0"),
});

export type TransferFormData = z.infer<typeof transferSchema>;
