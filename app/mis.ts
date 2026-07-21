export interface ClaimTracking {
  value: string,
  instant: Temporal.Instant,
}

export function replaceCommaPoint(value: string): string {
  if (value.includes(",")) return value.replace(",", ".");
  return value.replace(".", ",");
}