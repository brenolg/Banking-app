import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email obrigatório" })
    .refine((val) => /\S+@\S+\.\S+/.test(val), {
      message: "Email inválido",
    }),

  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});
