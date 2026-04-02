import * as loginService from "@/services/login";
import type { LoginResponse } from "@/types/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Login from ".";

// Intercepta o react-router-dom e sobrescreve o useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Espiona a função loginRequest (verificar chamadas)
vi.spyOn(loginService, "loginRequest");

// Helper pra renderizar com providers
function renderWithProviders() {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </QueryClientProvider>,
  );
}

describe("Login page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar os campos", () => {
    renderWithProviders();

    screen.getByPlaceholderText("seu@email.com");
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("deve mostrar erro de validação", async () => {
    renderWithProviders();

    const button = screen.getByRole("button", { name: /entrar/i });

    await userEvent.click(button);

    expect(await screen.findByText(/email obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/mínimo 6 caracteres/i)).toBeInTheDocument();
  });

  it("deve chamar loginRequest com dados corretos", async () => {
    renderWithProviders();

    vi.mocked(loginService.loginRequest).mockResolvedValue({
      token: "fake-token",
    });

    await userEvent.type(screen.getByLabelText(/email/i), "breno@test.com");
    await userEvent.type(screen.getByLabelText(/senha/i), "123456");

    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));
    await waitFor(() => {
      expect(loginService.loginRequest).toHaveBeenCalled();
    });

    const call = vi.mocked(loginService.loginRequest).mock.calls[0][0];

    expect(call).toMatchObject({
      email: "breno@test.com",
      password: "123456",
    });
  });

  it("deve redirecionar para /home no sucesso", async () => {
    renderWithProviders();

    vi.mocked(loginService.loginRequest).mockResolvedValue({
      token: "fake-token",
    });

    await userEvent.type(screen.getByLabelText(/email/i), "breno@test.com");
    await userEvent.type(screen.getByLabelText(/senha/i), "123456");

    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });

  it("deve mostrar erro no login inválido", async () => {
    renderWithProviders();

    vi.mocked(loginService.loginRequest).mockRejectedValue(
      new Error("Credenciais inválidas"),
    );

    globalThis.alert = vi.fn();

    await userEvent.type(screen.getByLabelText(/email/i), "errado@test.com");
    await userEvent.type(screen.getByLabelText(/senha/i), "123456");

    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(globalThis.alert).toHaveBeenCalledWith("Credenciais inválidas");
    });
  });

  it("deve mostrar loading no botão", async () => {
    renderWithProviders();

    let resolvePromise!: (value: LoginResponse) => void;

    vi.mocked(loginService.loginRequest).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        }),
    );

    await userEvent.type(screen.getByLabelText(/email/i), "breno@test.com");
    await userEvent.type(screen.getByLabelText(/senha/i), "123456");

    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(
      screen.getByRole("button", { name: /entrando/i }),
    ).toBeInTheDocument();

    resolvePromise({ token: "fake-token" });
  });
});
