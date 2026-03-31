import { AIRole, createAIAttributes } from "@cortexui/ai-contract";
import { ButtonBase } from "@cortexui/primitives";
import { forwardRef } from "react";

import type { ActionButtonProps } from "./types";

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ action, aiId, aiState, children, ...rest }, ref) => {
    const aiAttributes = createAIAttributes({
      action,
      id: aiId ?? action.id,
      role: AIRole.ACTION,
      state: aiState
    });

    return (
      <ButtonBase {...rest} {...aiAttributes} ref={ref}>
        {children}
      </ButtonBase>
    );
  }
);

ActionButton.displayName = "ActionButton";
