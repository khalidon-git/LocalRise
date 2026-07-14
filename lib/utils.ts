export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatINR(value: number): string {
  return "₹" + value.toLocaleString("en-IN");
}
