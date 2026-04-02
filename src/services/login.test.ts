import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { api, loginRequest } from "./login";

describe("loginRequest", () => {
  it("deve retornar token no sucesso", async () => {
    vi.spyOn(api, "post").mockResolvedValue({
      data: { token: "fake-token" },
    });

    const result = await loginRequest({
      email: "breno@test.com",
      password: "123456",
    });

    expect(result).toEqual({ token: "fake-token" });
  });

  it("deve lançar erro da API", async () => {
    vi.spyOn(api, "post").mockRejectedValue({
      response: {
        data: { message: "Credenciais inválidas" },
      },
    });

    vi.spyOn(axios, "isAxiosError").mockReturnValue(true);

    await expect(
      loginRequest({
        email: "errado@test.com",
        password: "123456",
      }),
    ).rejects.toThrow("Credenciais inválidas");
  });

  it("deve lançar erro inesperado", async () => {
    vi.spyOn(api, "post").mockRejectedValue(new Error("boom"));

    vi.spyOn(axios, "isAxiosError").mockReturnValue(false);

    await expect(
      loginRequest({
        email: "teste@test.com",
        password: "123456",
      }),
    ).rejects.toThrow("Erro inesperado");
  });
});
