import type { DashboardData, Transaction } from "@/types/money";
import { create } from "zustand";

type State = {
  balance: number;
  income: number;
  expenses: number;
  transactions: Transaction[];
  setDashboard: (data: DashboardData) => void;
};

export const useDashboardStore = create<State>((set) => ({
  balance: 0,
  income: 0,
  expenses: 0,
  transactions: [],

  setDashboard: (data) => {
    set({
      balance: data.balance,
      income: data.income,
      expenses: data.expenses,
      transactions: data.transactions,
    });
  },
}));
