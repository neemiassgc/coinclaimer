export interface ClaimBlock {
  value: number,
  instant: string,
}

export function replaceCommaPoint(value: string): string {
  if (value.includes(",")) return value.replace(",", ".");
  return value.replace(".", ",");
}