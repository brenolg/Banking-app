import type { Transaction } from "@/types/money";
import { formatDate } from "@/utils/formatDates";
import { formatMoney } from "@/utils/formatMoney";

type Props = Readonly<{
  transaction: Transaction;
}>;

export function ExtractItem({ transaction }: Props) {
  const isIncome = transaction.type === "income";

  return (
    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted transition">
      <div>
        <p className="font-medium mb-1">{transaction.title}</p>
        <p className="text-sm text-muted-foreground">
          {formatDate(transaction.date)}
        </p>
      </div>

      <p
        className={`font-semibold ${
          isIncome ? "text-green-500" : "text-red-500"
        }`}
      >
        {isIncome ? "+" : "-"} {formatMoney(Math.abs(transaction.amount))}
      </p>
    </div>
  );
}
