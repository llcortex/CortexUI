import {
  forwardRef,
  type CSSProperties,
  type ElementType,
  type ReactElement
} from "react";

import { Box } from "./Box";
import type { PolymorphicProps, PolymorphicRef, StackOwnProps } from "./types";

type StackComponent = <C extends ElementType = "div">(
  props: PolymorphicProps<C, StackOwnProps> & { ref?: PolymorphicRef<C> }
) => ReactElement | null;

const StackImpl = <C extends ElementType = "div">(
  {
    align,
    as,
    children,
    className,
    direction = "column",
    gap = "var(--cortexui-spacing)",
    justify,
    style,
    ...rest
  }: PolymorphicProps<C, StackOwnProps>,
  ref: PolymorphicRef<C>
) => {
  const stackStyle: CSSProperties = {
    alignItems: align,
    display: "flex",
    flexDirection: direction,
    gap,
    justifyContent: justify,
    ...style
  };

  return (
    <Box
      {...rest}
      as={as}
      className={className}
      ref={ref}
      style={stackStyle}
    >
      {children}
    </Box>
  );
};

export const Stack = forwardRef(StackImpl) as StackComponent;
Stack.displayName = "Stack";
