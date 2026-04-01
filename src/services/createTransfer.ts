import type { ApiError } from "@/types/api";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

type CreateTransferRequest = {
  amount: number;
  title: string;
};

type CreateTransferResponse = {
  id: string;
  amount: number;
  title: string;
  createdAt: string;
};

export const api = axios.create({
  baseURL: "http://fake-api.com",
});

const mock = new AxiosMockAdapter(api, {
  delayResponse: 3000,
});

// endpoint
mock.onPost("/transfer").reply((config) => {
  const data: CreateTransferRequest = JSON.parse(config.data);

  // validação
  if (data.amount <= 0) {
    return [
      400,
      {
        message: "Valor inválido",
      },
    ];
  }

  return [
    201,
    {
      id: crypto.randomUUID(),
      amount: data.amount,
      title: data.title,
      createdAt: new Date().toISOString(),
    },
  ];
});

export async function createTransfer(
  data: CreateTransferRequest,
): Promise<CreateTransferResponse> {
  try {
    const { data: response } = await api.post<CreateTransferResponse>(
      "/transfer",
      data,
    );

    return response;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      throw new Error(error.response?.data?.message || "Erro na requisição");
    }

    throw new Error("Erro inesperado");
  }
}
