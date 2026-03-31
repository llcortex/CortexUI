import "vitest";

declare module "vitest" {
  interface Assertion<T = any> {
    toBeAIContractValid(): T;
    toHaveAIAttributes(expected: Record<string, string>): T;
    toPassAccessibilityChecks(): T;
    toMatchAIMetadataSnapshot(expected: string): T;
  }

  interface AsymmetricMatchersContaining {
    toBeAIContractValid(): void;
    toHaveAIAttributes(expected: Record<string, string>): void;
    toPassAccessibilityChecks(): void;
    toMatchAIMetadataSnapshot(expected: string): void;
  }
}
