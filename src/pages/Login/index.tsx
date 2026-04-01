import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginRequest } from "@/services/login";
import type { LoginResponse } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { loginSchema } from "./schema";

type FormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const mutation = useMutation<
    LoginResponse, // retorno
    Error, // tipo do erro
    FormData // dados enviados
  >({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  function onSubmit(data: FormData) {
    mutation.mutate(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Email*/}
            <FormField
              label="Email"
              type="email"
              placeholder="seu@email.com"
              registration={register("email")}
              error={errors.email}
            />

            {/* Senha*/}
            <FormField
              label="Senha"
              type="password"
              placeholder="********"
              registration={register("password")}
              error={errors.password}
            />

            {/* Botão submit*/}
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
