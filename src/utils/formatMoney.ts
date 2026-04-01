export function formatMoney(value?: number) {
  if (value === undefined || value === null) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
