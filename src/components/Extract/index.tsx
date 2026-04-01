import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Transaction } from "@/types/money";
import { ExtractItem } from "./ExtractItem";

type Props = Readonly<{
  transactions?: Transaction[];
}>;

export function Extract({ transactions = [] }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 divide-y">
        {transactions.map((t) => (
          <ExtractItem key={t.id} transaction={t} />
        ))}
      </CardContent>
    </Card>
  );
}
