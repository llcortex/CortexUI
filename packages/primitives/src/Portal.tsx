import type { ReactPortal } from "react";
import { createPortal } from "react-dom";

import type { PortalProps } from "./types";

export function Portal({ children, container }: PortalProps): ReactPortal | null {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(children, container ?? document.body);
}
