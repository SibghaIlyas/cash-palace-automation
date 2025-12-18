export function parseMoney(text: string): number {
  // to get number from total amount like "$1,234.56" 
  const cleaned = text.replace(/[^\d.-]/g, "");
  return Number(cleaned);
}

export function toFixed2(n: number): number {
  return Math.round(n * 100) / 100;
}
