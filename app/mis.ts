export interface ClaimTracking {
  value: string,
  instant: string,
}

export function replaceCommaPoint(value: string): string {
  if (value.includes(",")) return value.replace(",", ".");
  return value.replace(".", ",");
}