export type Transaction = {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly amount: number;
  readonly type: "income" | "expense";
};
