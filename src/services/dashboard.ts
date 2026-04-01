import { useDashboardStore } from "@/store/useDashboardStore";
import type { Transaction } from "@/types/money";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

type DashboardData = {
  balance: number;
  income: number;
  expenses: number;
  transactions: Transaction[];
};

export const api = axios.create({
  baseURL: "http://fake-api.com",
});

// mock adapter
const mock = new AxiosMockAdapter(api, {
  delayResponse: 3000, // simula loading
});

// mock
const mockData: DashboardData = {
  balance: 500,
  income: 500,
  expenses: -300,
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

//  endpoint fake
mock.onGet("/dashboard").reply(200, mockData);

export async function getDashboardData(): Promise<DashboardData> {
  const response = await api.get("/dashboard");

  const setDashboard = useDashboardStore.getState().setDashboard;

  // popula o store
  setDashboard(response.data);

  return response.data;
}
