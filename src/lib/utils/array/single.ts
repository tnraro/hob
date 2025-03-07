export function single<T>(items: T[]) {
  if (items.length === 0) return null;
  if (items.length === 1) return items[0];
  throw new Error("items is not single");
}
