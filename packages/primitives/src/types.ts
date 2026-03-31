import type {
  AriaAttributes,
  CSSProperties,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ForwardedRef,
  ReactElement,
  ReactNode,
  RefObject
} from "react";

export type PrimitiveElement = ElementType;

export type PolymorphicRef<C extends PrimitiveElement> = ComponentPropsWithRef<C>["ref"];

export type PolymorphicProps<C extends PrimitiveElement, Props = {}> = Props &
  Omit<ComponentPropsWithoutRef<C>, keyof Props | "as"> & {
    as?: C;
  };

export interface PrimitiveStyleProps {
  readonly className?: string;
  readonly children?: ReactNode;
}

export interface PrimitiveBoxProps extends PrimitiveStyleProps {
  readonly style?: CSSProperties;
}

export interface SurfaceDescriptor {
  readonly id: string;
  readonly tokenNamespace: string;
}

export interface DialogBaseOwnProps extends PrimitiveStyleProps {
  readonly open: boolean;
  readonly onOpenChange?: (open: boolean) => void;
  readonly ariaLabel?: string;
  readonly ariaLabelledBy?: string;
  readonly ariaDescribedBy?: string;
  readonly closeOnEscape?: boolean;
  readonly closeOnInteractOutside?: boolean;
  readonly initialFocusRef?: RefObject<HTMLElement>;
}

export type DialogBaseElementProps = Omit<
  ComponentPropsWithoutRef<"div">,
  keyof DialogBaseOwnProps | "children"
>;

export type DialogBaseProps = DialogBaseOwnProps & DialogBaseElementProps;

export interface PortalProps {
  readonly children?: ReactNode;
  readonly container?: Element | DocumentFragment | null;
}

export type InputBaseProps = Omit<ComponentPropsWithoutRef<"input">, "size"> &
  PrimitiveStyleProps & {
    readonly invalid?: boolean;
  };

export type ButtonBaseProps = ComponentPropsWithoutRef<"button"> &
  PrimitiveStyleProps & {
    readonly loading?: boolean;
    readonly loadingLabel?: string;
  };

export interface StackOwnProps extends PrimitiveBoxProps {
  readonly direction?: "row" | "column";
  readonly gap?: number | string;
  readonly align?: CSSProperties["alignItems"];
  readonly justify?: CSSProperties["justifyContent"];
}

export interface TextOwnProps extends PrimitiveBoxProps {
  readonly tone?: "default" | "muted" | "danger" | "success";
  readonly visuallyHidden?: boolean;
}

export type PrimitiveAriaProps = AriaAttributes;

export type PrimitiveComponent<C extends PrimitiveElement, Props> = <
  T extends PrimitiveElement = C
>(
  props: PolymorphicProps<T, Props> & { ref?: ForwardedRef<unknown> }
) => ReactElement | null;
