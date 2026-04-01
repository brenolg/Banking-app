import type { DashboardData, Transaction } from "@/types/money";
import { create } from "zustand";

type State = {
  balance: number;
  income: number;
  expenses: number;
  transactions: Transaction[];
  setDashboard: (data: DashboardData) => void;
  addTransaction: (transaction: Transaction) => void;
  transfer: (amount: number, title: string) => void;
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

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  transfer: (amount: number, title: string) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      title,
      amount: -amount,
      type: "expense",
      date: new Date().toISOString(),
    };

    set((state) => ({
      balance: state.balance - amount,
      expenses: state.expenses - amount,
      transactions: [newTransaction, ...state.transactions],
    }));
  },
}));
