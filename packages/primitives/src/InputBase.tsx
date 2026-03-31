import { forwardRef, type CSSProperties } from "react";

import { primitiveVars } from "./styles";
import type { InputBaseProps } from "./types";

const inputBaseStyle: CSSProperties = {
  appearance: "none",
  background: `var(${primitiveVars.surface})`,
  border: `1px solid var(${primitiveVars.borderColor})`,
  borderRadius: `var(${primitiveVars.radius})`,
  color: `var(${primitiveVars.foreground})`,
  font: "inherit",
  minHeight: "2.5rem",
  outline: "none",
  padding: "0.625rem 0.875rem",
  width: "100%"
};

export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  ({ className, invalid = false, style, ...rest }, ref) => (
    <input
      {...rest}
      aria-invalid={invalid || rest["aria-invalid"] ? true : undefined}
      className={className}
      ref={ref}
      style={{
        ...inputBaseStyle,
        borderColor: invalid
          ? `var(${primitiveVars.dangerColor})`
          : `var(${primitiveVars.borderColor})`,
        boxShadow: invalid ? `0 0 0 3px color-mix(in srgb, var(${primitiveVars.dangerColor}) 16%, transparent)` : undefined,
        ...style
      }}
    />
  )
);

InputBase.displayName = "InputBase";
