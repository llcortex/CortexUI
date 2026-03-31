import {
  createElement,
  forwardRef,
  type CSSProperties,
  type ElementType
} from "react";

import { primitiveTheme } from "./styles";
import type { PolymorphicProps, PolymorphicRef, PrimitiveBoxProps } from "./types";

const defaultBoxStyle: CSSProperties = {
  boxSizing: "border-box"
};

type BoxComponent = <C extends ElementType = "div">(
  props: PolymorphicProps<C, PrimitiveBoxProps> & { ref?: PolymorphicRef<C> }
) => ReturnType<typeof createElement>;

const BoxImpl = <C extends ElementType = "div">(
  { as, children, className, style, ...rest }: PolymorphicProps<C, PrimitiveBoxProps>,
  ref: PolymorphicRef<C>
) => {
  const Component = as ?? "div";

  return createElement(
    Component,
    {
      ...rest,
      className,
      ref,
      style: {
        ...primitiveTheme,
        ...defaultBoxStyle,
        ...style
      }
    },
    children
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BoxWithRef = forwardRef(BoxImpl as any) as unknown as BoxComponent & { displayName?: string };
BoxWithRef.displayName = "Box";
export const Box = BoxWithRef;
