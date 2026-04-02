import type { ApiError } from "@/types/api";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

export const api = axios.create({
  baseURL: "https://fake.com",
});

// mock
const mock = new AxiosMockAdapter(api, {
  delayResponse: 3000, // simula loading do login
});

// endpoint fake
mock.onPost("/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  if (email === "breno@test.com" && password === "123456") {
    return [
      200,
      {
        token: "fake-token",
      },
    ];
  }

  return [
    401,
    {
      message: "Credenciais inválidas",
    },
  ];
});

//  login
export async function loginRequest(data: LoginRequest): Promise<LoginResponse> {
  try {
    const { data: response } = await api.post<LoginResponse>("/login", data);

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError<ApiError>(error)) {
      const message = error.response?.data?.message || "Erro na requisição";

      throw new Error(message);
    }

    throw new Error("Erro inesperado");
  }
}
