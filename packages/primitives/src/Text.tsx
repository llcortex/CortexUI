import {
  forwardRef,
  type CSSProperties,
  type ElementType,
  type ReactElement
} from "react";

import { Box } from "./Box";
import { primitiveVars, visuallyHiddenStyle } from "./styles";
import type { PolymorphicProps, PolymorphicRef, TextOwnProps } from "./types";

const textToneStyles: Record<NonNullable<TextOwnProps["tone"]>, CSSProperties> = {
  default: {
    color: `var(${primitiveVars.foreground})`
  },
  muted: {
    color: `var(${primitiveVars.mutedForeground})`
  },
  danger: {
    color: `var(${primitiveVars.dangerColor})`
  },
  success: {
    color: `var(${primitiveVars.successColor})`
  }
};

type TextComponent = <C extends ElementType = "span">(
  props: PolymorphicProps<C, TextOwnProps> & { ref?: PolymorphicRef<C> }
) => ReactElement | null;

const TextImpl = <C extends ElementType = "span">(
  {
    as,
    children,
    className,
    style,
    tone = "default",
    visuallyHidden = false,
    ...rest
  }: PolymorphicProps<C, TextOwnProps>,
  ref: PolymorphicRef<C>
) => (
  <Box
    {...rest}
    as={as ?? "span"}
    className={className}
    ref={ref}
    style={{
      fontFamily: "inherit",
      lineHeight: 1.5,
      margin: 0,
      ...textToneStyles[tone],
      ...(visuallyHidden ? visuallyHiddenStyle : undefined),
      ...style
    }}
  >
    {children}
  </Box>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextWithRef = forwardRef(TextImpl as any) as unknown as TextComponent & { displayName?: string };
TextWithRef.displayName = "Text";
export const Text = TextWithRef;
