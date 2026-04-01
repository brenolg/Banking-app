type Props = {
  readonly title: string;
  readonly value?: number;
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/utils/formatMoney";

export default function MoneyCard({ title, value = 0 }: Props) {
  const isPositive = value >= 0;

  const color = isPositive ? "text-green-500" : "text-red-500";
  const sign = isPositive ? "+" : "-";

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className={`text-xl font-semibold ${color}`}>
          {sign} {formatMoney(Math.abs(value))}
        </p>
      </CardContent>
    </Card>
  );
}
