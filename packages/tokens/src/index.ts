export type DesignTokenScale = {
  readonly name: string;
  readonly values: Readonly<Record<string, string>>;
};

export const colorTokens: DesignTokenScale = {
  name: "color",
  values: {
    surface: "#ffffff",
    accent: "#111827"
  }
};
