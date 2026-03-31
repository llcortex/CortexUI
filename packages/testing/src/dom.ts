import type { VirtualAttribute, VirtualElement, VirtualElementOptions } from "./types";

export function createVirtualElement(options: VirtualElementOptions = {}): VirtualElement {
  const attributes = Object.entries(options.attributes ?? {})
    .filter((entry): entry is [string, string] => typeof entry[1] === "string")
    .map<VirtualAttribute>(([name, value]) => ({ name, value }));

  return {
    attributes,
    dataset: Object.fromEntries(
      attributes
        .filter((attribute) => attribute.name.startsWith("data-"))
        .map((attribute) => [toDatasetKey(attribute.name), attribute.value])
    ),
    getAttribute(name: string): string | null {
      return attributes.find((attribute) => attribute.name === name)?.value ?? null;
    },
    hasAttribute(name: string): boolean {
      return attributes.some((attribute) => attribute.name === name);
    },
    hidden: options.hidden ?? false,
    tagName: options.tagName ?? "div",
    textContent: options.textContent ?? ""
  };
}

function toDatasetKey(name: string): string {
  return name
    .replace(/^data-/, "")
    .split("-")
    .map((part, index) => (index === 0 ? part : `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`))
    .join("");
}
