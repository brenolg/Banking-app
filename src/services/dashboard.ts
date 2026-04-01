import type { Transaction } from "@/types/money";

type DashboardData = {
  balance: number;
  income: number;
  expenses: number;
  transactions: Transaction[];
};

export async function getDashboardData(): Promise<DashboardData> {
  await new Promise((r) => setTimeout(r, 1000));

  return {
    balance: 5230.75,
    expenses: -300,
    income: 500,
    transactions: [
      {
        id: "1",
        title: "Salário",
        amount: 5000,
        type: "income",
        date: "2026-04-01",
      },
      {
        id: "2",
        title: "Netflix",
        amount: -39.9,
        type: "expense",
        date: "2026-03-28",
      },
      {
        id: "3",
        title: "Mercado",
        amount: -120.5,
        type: "expense",
        date: "2026-03-27",
      },
    ],
  };
}
