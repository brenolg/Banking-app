import { getDashboardData } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Extract } from "@/components/Extract";
import Loading from "@/components/loading";
import MoneyCard from "@/components/MoneyCard";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/utils/formatMoney";

export default function Home() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-12 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Saldo*/}
        <div className="col-span-1 md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Saldo</CardTitle>

            <Button onClick={() => navigate("/transfer")}>Transferir</Button>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{formatMoney(data?.balance)}</p>
          </CardContent>
        </div>
      </div>
      {/* Despesas e entradas totais */}
      <div className="flex gap-6">
        <MoneyCard title="Entradas" value={data?.income} />
        <MoneyCard title="Saídas" value={data?.expenses} />
      </div>

      {/* Transações */}
      <Extract transactions={data?.transactions} />
    </div>
  );
}
