import type { CSSProperties } from "react";

import { colorTokens } from "@cortexui/tokens";

export const primitiveVars = {
  borderColor: "--cortexui-border-color",
  dangerColor: "--cortexui-danger-color",
  focusRing: "--cortexui-focus-ring",
  foreground: "--cortexui-foreground",
  mutedForeground: "--cortexui-muted-foreground",
  radius: "--cortexui-radius",
  spacing: "--cortexui-spacing",
  successColor: "--cortexui-success-color",
  surface: "--cortexui-surface"
} as const;

export const primitiveTheme: CSSProperties = {
  [primitiveVars.surface]: colorTokens.values.surface,
  [primitiveVars.foreground]: colorTokens.values.accent,
  [primitiveVars.borderColor]: "rgba(17, 24, 39, 0.16)",
  [primitiveVars.focusRing]: "rgba(17, 24, 39, 0.24)",
  [primitiveVars.mutedForeground]: "rgba(17, 24, 39, 0.7)",
  [primitiveVars.dangerColor]: "#b91c1c",
  [primitiveVars.successColor]: "#15803d",
  [primitiveVars.radius]: "12px",
  [primitiveVars.spacing]: "0.75rem"
};

export const visuallyHiddenStyle: CSSProperties = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px"
};
