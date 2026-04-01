export async function createTransfer(data: { amount: number; title: string }) {
  await new Promise((r) => setTimeout(r, 3000));

  return data;
}
