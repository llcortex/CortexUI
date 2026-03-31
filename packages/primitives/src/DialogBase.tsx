import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref
} from "react";

import { Box } from "./Box";
import { Portal } from "./Portal";
import { primitiveVars } from "./styles";
import type { DialogBaseProps } from "./types";

const overlayStyle: CSSProperties = {
  alignItems: "center",
  background: "rgba(17, 24, 39, 0.48)",
  display: "flex",
  inset: 0,
  justifyContent: "center",
  padding: "1.5rem",
  position: "fixed",
  zIndex: 1000
};

const dialogStyle: CSSProperties = {
  background: `var(${primitiveVars.surface})`,
  border: `1px solid var(${primitiveVars.borderColor})`,
  borderRadius: `var(${primitiveVars.radius})`,
  boxShadow: "0 24px 80px rgba(15, 23, 42, 0.24)",
  color: `var(${primitiveVars.foreground})`,
  maxWidth: "40rem",
  outline: "none",
  padding: "1.25rem",
  width: "100%"
};

function assignRef<T>(ref: Ref<T> | undefined, value: T): void {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref && "current" in ref) {
    (ref as { current: T }).current = value;
  }
}

export const DialogBase = forwardRef<HTMLDivElement, DialogBaseProps>(
  (
    {
      ariaDescribedBy,
      ariaLabel,
      ariaLabelledBy,
      children,
      className,
      closeOnEscape = true,
      closeOnInteractOutside = true,
      initialFocusRef,
      onOpenChange,
      open,
      ...rest
    },
    ref
  ) => {
    const fallbackFocusRef = useRef<HTMLDivElement>(null);
    const generatedLabelId = useId();
    const lastActiveElementRef = useRef<Element | null>(null);

    useEffect(() => {
      if (!open || typeof document === "undefined") {
        return;
      }

      lastActiveElementRef.current = document.activeElement;
      const target = initialFocusRef?.current ?? fallbackFocusRef.current;
      target?.focus();

      return () => {
        if (lastActiveElementRef.current instanceof HTMLElement) {
          lastActiveElementRef.current.focus();
        }
      };
    }, [initialFocusRef, open]);

    useEffect(() => {
      if (!open || !closeOnEscape || typeof document === "undefined") {
        return;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onOpenChange?.(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [closeOnEscape, onOpenChange, open]);

    if (!open) {
      return null;
    }

    const labelId = ariaLabel ? undefined : (ariaLabelledBy ?? generatedLabelId);

    const handleOverlayKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape" && closeOnEscape) {
        event.stopPropagation();
        onOpenChange?.(false);
      }
    };

    return (
      <Portal>
        <Box
          aria-hidden={false}
          onClick={
            closeOnInteractOutside
              ? () => {
                  onOpenChange?.(false);
                }
              : undefined
          }
          onKeyDown={handleOverlayKeyDown}
          style={overlayStyle}
        >
          <Box
            {...rest}
            aria-describedby={ariaDescribedBy}
            aria-label={ariaLabel}
            aria-labelledby={labelId}
            aria-modal="true"
            className={className}
            onClick={(event) => {
              event.stopPropagation();
            }}
            ref={(node) => {
              fallbackFocusRef.current = node;
              assignRef(ref, node);
            }}
            role="dialog"
            style={dialogStyle}
            tabIndex={-1}
          >
            {!ariaLabel && !ariaLabelledBy ? (
              <div id={generatedLabelId} style={{ display: "none" }}>
                Dialog
              </div>
            ) : null}
            {children}
          </Box>
        </Box>
      </Portal>
    );
  }
);

DialogBase.displayName = "DialogBase";
