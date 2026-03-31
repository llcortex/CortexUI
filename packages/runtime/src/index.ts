import { AIEvent } from "@cortexui/ai-contract";

import { installCortexUIDevtools } from "./devtools";
import { installCortexUIRuntime } from "./runtime";
import type {
  CortexUIDevtoolsAPI,
  CortexUIGlobalAPI,
  RuntimeRegistry
} from "./types";

export { installCortexUIDevtools } from "./devtools";
export { CortexUIRuntime, installCortexUIRuntime } from "./runtime";
export type {
  AvailableAction,
  CortexUIDevtoolsAPI,
  CortexUIGlobalAPI,
  FormFieldSchema,
  FormSchema,
  RuntimeEventLogEntry,
  RuntimeRegistry,
  ScreenContext,
  VisibleEntity
} from "./types";

export const runtimeRegistry: RuntimeRegistry = {
  prompt: "browser-inspection-runtime",
  components: [
    "getScreenContext",
    "getAvailableActions",
    "getFormSchema",
    "getVisibleEntities",
    "getRecentEvents"
  ]
};

export const defaultRuntimeEvent = AIEvent.ACTION_TRIGGERED;

export const CORTEX_UI: CortexUIGlobalAPI | null =
  typeof window === "undefined" ? null : installCortexUIRuntime(window);

export const CORTEX_UI_DEVTOOLS: CortexUIDevtoolsAPI | null =
  typeof window === "undefined" ? null : installCortexUIDevtools(window);

declare global {
  interface Window {
    CORTEX_UI?: CortexUIGlobalAPI;
    CORTEX_UI_DEVTOOLS?: CortexUIDevtoolsAPI;
  }
}
