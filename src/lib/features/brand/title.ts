import { brandName } from "./brand-name";

export function makeTitle(name?: string) {
  if (name == null) return brandName;
  return `${name} | ${brandName}`;
}
