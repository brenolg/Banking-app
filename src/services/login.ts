import type { LoginRequest, LoginResponse } from "@/types/auth";
import axios from "axios";

// instância da API com o axios
const api = axios.create({
  baseURL: "https://fake.com",
});

export async function loginRequest(data: LoginRequest): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // aqui seria utilizado o axios
  if (data.email === "breno@test.com" && data.password === "123456") {
    return {
      token: "fake-token",
    };
  }

  throw new Error("Credenciais inválidas");
}
