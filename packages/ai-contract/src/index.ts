/**
 * Canonical attribute name for a stable machine-readable element identifier.
 * Usage: assign a unique value to connect rendered UI to AI tooling.
 * Example: `<button data-ai-id="save-profile" />`
 */
export const DATA_AI_ID = "data-ai-id";

/**
 * Canonical attribute name for the semantic UI role exposed to AI systems.
 * Usage: pair with one of the exported `AIRole` values.
 * Example: `<button data-ai-role="action" />`
 */
export const DATA_AI_ROLE = "data-ai-role";

/**
 * Canonical attribute name for the action name an element triggers.
 * Usage: use a stable verb phrase that maps to an `AIAction`.
 * Example: `<button data-ai-action="save-profile" />`
 */
export const DATA_AI_ACTION = "data-ai-action";

/**
 * Canonical attribute name for the current UI state.
 * Usage: store one or more comma-separated `AIState` values.
 * Example: `<section data-ai-state="loading,expanded" />`
 */
export const DATA_AI_STATE = "data-ai-state";

/**
 * Canonical attribute name for the screen or route identifier.
 * Usage: mark elements with the screen they belong to for navigation-aware automation.
 * Example: `<main data-ai-screen="settings" />`
 */
export const DATA_AI_SCREEN = "data-ai-screen";

/**
 * Canonical attribute name for a logical section inside a screen.
 * Usage: group related elements such as page panels or content regions.
 * Example: `<div data-ai-section="profile-form" />`
 */
export const DATA_AI_SECTION = "data-ai-section";

/**
 * Canonical attribute name for the domain entity represented by an element.
 * Usage: annotate views with a business object name.
 * Example: `<tr data-ai-entity="invoice" />`
 */
export const DATA_AI_ENTITY = "data-ai-entity";

/**
 * Canonical attribute name for the identifier of the annotated domain entity.
 * Usage: pair with `data-ai-entity` to target a specific record.
 * Example: `<tr data-ai-entity="invoice" data-ai-entity-id="inv_123" />`
 */
export const DATA_AI_ENTITY_ID = "data-ai-entity-id";

/**
 * Canonical attribute name for the expected input or field value kind.
 * Usage: label controls with stable data types such as `email` or `currency`.
 * Example: `<input data-ai-field-type="email" />`
 */
export const DATA_AI_FIELD_TYPE = "data-ai-field-type";

/**
 * Canonical attribute name for whether a field is required.
 * Usage: set to the string `"true"` or `"false"` for machine parsing.
 * Example: `<input data-ai-required="true" />`
 */
export const DATA_AI_REQUIRED = "data-ai-required";

/**
 * Canonical attribute name for the result emitted by an interaction.
 * Usage: attach success payload labels or result categories.
 * Example: `<div data-ai-result="profile-saved" />`
 */
export const DATA_AI_RESULT = "data-ai-result";

/**
 * Canonical attribute name for a human-readable semantic status.
 * Usage: surface banner or message severity in a stable machine-readable form.
 * Example: `<div data-ai-status="error" />`
 */
export const DATA_AI_STATUS = "data-ai-status";

/**
 * Canonical attribute name for the AI event associated with a rendered node.
 * Usage: attach contract events to banners, notifications, and live regions.
 * Example: `<div data-ai-event="action_completed" />`
 */
export const DATA_AI_EVENT = "data-ai-event";

/**
 * Canonical attribute name for human-facing feedback surfaced by the UI.
 * Usage: expose confirmations or validation feedback to AI observers.
 * Example: `<p data-ai-feedback="Email is invalid" />`
 */
export const DATA_AI_FEEDBACK = "data-ai-feedback";

/**
 * Ordered list of all supported AI contract attribute names.
 * Usage: iterate over the contract surface when extracting or validating nodes.
 * Example: `AI_ATTRIBUTE_NAMES.forEach((name) => console.log(name));`
 */
export const AI_ATTRIBUTE_NAMES = [
  DATA_AI_ID,
  DATA_AI_ROLE,
  DATA_AI_ACTION,
  DATA_AI_STATE,
  DATA_AI_SCREEN,
  DATA_AI_SECTION,
  DATA_AI_ENTITY,
  DATA_AI_ENTITY_ID,
  DATA_AI_FIELD_TYPE,
  DATA_AI_REQUIRED,
  DATA_AI_RESULT,
  DATA_AI_STATUS,
  DATA_AI_EVENT,
  DATA_AI_FEEDBACK
] as const;

/**
 * Union of every supported AI contract attribute key.
 * Usage: type keys when building attribute maps or helper inputs.
 * Example: `const key: AIAttributeName = DATA_AI_ROLE;`
 */
export type AIAttributeName = (typeof AI_ATTRIBUTE_NAMES)[number];

/**
 * Canonical role values that describe the structural purpose of a UI element.
 * Usage: prefer these constants over ad hoc strings to keep contracts stable.
 * Example: `AIRole.ACTION`
 */
export const AIRole = {
  ACTION: "action",
  FIELD: "field",
  FORM: "form",
  TABLE: "table",
  MODAL: "modal",
  NAV_ITEM: "nav-item",
  STATUS: "status",
  SECTION: "section",
  SCREEN: "screen"
} as const;

/**
 * Union of supported AI role values.
 * Usage: type role fields in contracts and helper inputs.
 * Example: `const role: AIRole = AIRole.FORM;`
 */
export type AIRole = (typeof AIRole)[keyof typeof AIRole];

/**
 * Canonical state values that describe the current interaction or render state.
 * Usage: compose one or more states when serializing UI conditions.
 * Example: `[AIState.LOADING, AIState.DISABLED]`
 */
export const AIState = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
  DISABLED: "disabled",
  EXPANDED: "expanded",
  SELECTED: "selected",
  EMPTY: "empty"
} as const;

/**
 * Union of supported AI state values.
 * Usage: type state arrays and normalize state attribute payloads.
 * Example: `const state: AIState = AIState.SUCCESS;`
 */
export type AIState = (typeof AIState)[keyof typeof AIState];

/**
 * Canonical event names emitted by the AI contract layer.
 * Usage: use these names for telemetry, automation hooks, or runtime dispatch.
 * Example: `AIEvent.ACTION_TRIGGERED`
 */
export const AIEvent = {
  ACTION_TRIGGERED: "action_triggered",
  ACTION_COMPLETED: "action_completed",
  ACTION_FAILED: "action_failed",
  FIELD_UPDATED: "field_updated",
  FORM_SUBMITTED: "form_submitted"
} as const;

/**
 * Union of supported AI event names.
 * Usage: type event payloads and emitter APIs.
 * Example: `const event: AIEvent = AIEvent.FORM_SUBMITTED;`
 */
export type AIEvent = (typeof AIEvent)[keyof typeof AIEvent];

/**
 * Machine-readable description of a UI action.
 * Usage: represent interactive affordances in a stable contract that other packages can inspect.
 * Example: `{ id: "save-profile", name: "Save profile", expectedOutcome: "Profile is persisted" }`
 */
export interface AIAction {
  readonly id: string;
  readonly name: string;
  readonly target?: string;
  readonly expectedOutcome?: string;
}

/**
 * Strongly typed shape for supported AI attribute values before serialization.
 * Usage: pass this to `createAIAttributes` when annotating rendered elements.
 * Example: `{ id: "email", role: AIRole.FIELD, required: true }`
 */
export interface AIAttributeConfig {
  readonly id?: string;
  readonly role?: AIRole;
  readonly action?: string | AIAction;
  readonly state?: AIState | readonly AIState[];
  readonly screen?: string;
  readonly section?: string;
  readonly entity?: string;
  readonly entityId?: string;
  readonly fieldType?: string;
  readonly required?: boolean;
  readonly result?: string;
  readonly status?: string;
  readonly event?: AIEvent;
  readonly feedback?: string;
}

/**
 * Serialized map of AI attributes ready to spread into DOM props or render output.
 * Usage: the helpers only emit contract keys defined by `AIAttributeName`.
 * Example: `const attrs: AIAttributeMap = createAIAttributes({ id: "save" });`
 */
export type AIAttributeMap = Partial<Record<AIAttributeName, string>>;

/**
 * Minimal element contract consumed by the helper functions.
 * Usage: works with real DOM elements and DOM-like test doubles.
 * Example: `{ getAttribute: (name) => node[name] ?? null }`
 */
export interface AIAttributeElement {
  readonly getAttribute?: (name: string) => string | null;
  readonly hasAttribute?: (name: string) => boolean;
  readonly attributes?: IterableLike<{ readonly name: string; readonly value: string }>;
  readonly dataset?: Record<string, string | undefined>;
  readonly [key: string]: unknown;
}

/**
 * Validation result returned by `validateAIAttributes`.
 * Usage: inspect `valid` for pass/fail and use `errors` for actionable diagnostics.
 * Example: `if (!result.valid) console.error(result.errors);`
 */
export interface AIAttributeValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly attributes: AIAttributeMap;
}

/**
 * Minimal iterable contract used for reading element attributes without a DOM dependency.
 * Usage: keeps the package portable across browser, server, and test environments.
 * Example: `attributes: [{ name: DATA_AI_ID, value: "save" }]`
 */
export interface IterableLike<T> {
  [Symbol.iterator](): Iterator<T>;
}

const ROLE_VALUES = new Set<AIRole>(Object.values(AIRole));
const STATE_VALUES = new Set<AIState>(Object.values(AIState));

/**
 * Create a serialized AI attribute map from typed config.
 * Usage: feed the result directly into a JSX spread or template renderer.
 * Example: `createAIAttributes({ id: "checkout", role: AIRole.ACTION, state: [AIState.IDLE] })`
 */
export function createAIAttributes(config: AIAttributeConfig): AIAttributeMap {
  const attributes: AIAttributeMap = {};

  assignAttribute(attributes, DATA_AI_ID, config.id);
  assignAttribute(attributes, DATA_AI_ROLE, config.role);
  assignAttribute(
    attributes,
    DATA_AI_ACTION,
    typeof config.action === "string" ? config.action : config.action?.id
  );
  assignAttribute(attributes, DATA_AI_STATE, normalizeStates(config.state));
  assignAttribute(attributes, DATA_AI_SCREEN, config.screen);
  assignAttribute(attributes, DATA_AI_SECTION, config.section);
  assignAttribute(attributes, DATA_AI_ENTITY, config.entity);
  assignAttribute(attributes, DATA_AI_ENTITY_ID, config.entityId);
  assignAttribute(attributes, DATA_AI_FIELD_TYPE, config.fieldType);
  assignAttribute(
    attributes,
    DATA_AI_REQUIRED,
    typeof config.required === "boolean" ? String(config.required) : undefined
  );
  assignAttribute(attributes, DATA_AI_RESULT, config.result);
  assignAttribute(attributes, DATA_AI_STATUS, config.status);
  assignAttribute(attributes, DATA_AI_EVENT, config.event);
  assignAttribute(attributes, DATA_AI_FEEDBACK, config.feedback);

  return attributes;
}

/**
 * Extract every supported AI contract attribute from a DOM element or DOM-like object.
 * Usage: call this inside runtime inspection, analytics, or tests to get a normalized map.
 * Example: `const attrs = extractAIAttributes(buttonElement);`
 */
export function extractAIAttributes(element: AIAttributeElement): AIAttributeMap {
  const extracted: AIAttributeMap = {};

  for (const name of AI_ATTRIBUTE_NAMES) {
    const value = readAttribute(element, name);
    if (value !== undefined) {
      extracted[name] = value;
    }
  }

  return extracted;
}

/**
 * Validate supported AI attributes on a DOM element or DOM-like object.
 * Usage: enforce contract correctness in tests, runtime assertions, or design system checks.
 * Example: `const result = validateAIAttributes(node);`
 */
export function validateAIAttributes(
  element: AIAttributeElement
): AIAttributeValidationResult {
  const attributes = extractAIAttributes(element);
  const errors: string[] = [];
  const hasContractAttributes = Object.keys(attributes).length > 0;

  if (hasContractAttributes && attributes[DATA_AI_ID] === undefined) {
    errors.push(`${DATA_AI_ID} is required when any AI contract attribute is present.`);
  }

  const role = attributes[DATA_AI_ROLE];
  if (role !== undefined && !ROLE_VALUES.has(role as AIRole)) {
    errors.push(`${DATA_AI_ROLE} must be one of: ${Object.values(AIRole).join(", ")}.`);
  }

  const stateValue = attributes[DATA_AI_STATE];
  if (stateValue !== undefined) {
    for (const state of stateValue.split(",").map((item) => item.trim()).filter(Boolean)) {
      if (!STATE_VALUES.has(state as AIState)) {
        errors.push(
          `${DATA_AI_STATE} contains invalid state "${state}". Expected one of: ${Object.values(
            AIState
          ).join(", ")}.`
        );
      }
    }
  }

  const requiredValue = attributes[DATA_AI_REQUIRED];
  if (requiredValue !== undefined && requiredValue !== "true" && requiredValue !== "false") {
    errors.push(`${DATA_AI_REQUIRED} must be the string "true" or "false".`);
  }

  const eventValue = attributes[DATA_AI_EVENT];
  if (eventValue !== undefined && !Object.values(AIEvent).includes(eventValue as AIEvent)) {
    errors.push(`${DATA_AI_EVENT} must be one of: ${Object.values(AIEvent).join(", ")}.`);
  }

  if (attributes[DATA_AI_ACTION] !== undefined && attributes[DATA_AI_ACTION]?.trim() === "") {
    errors.push(`${DATA_AI_ACTION} cannot be empty.`);
  }

  if (
    attributes[DATA_AI_ENTITY_ID] !== undefined &&
    attributes[DATA_AI_ENTITY] === undefined
  ) {
    errors.push(`${DATA_AI_ENTITY} is required when ${DATA_AI_ENTITY_ID} is present.`);
  }

  if (
    attributes[DATA_AI_FIELD_TYPE] !== undefined &&
    attributes[DATA_AI_ROLE] !== AIRole.FIELD
  ) {
    errors.push(`${DATA_AI_FIELD_TYPE} requires ${DATA_AI_ROLE}="${AIRole.FIELD}".`);
  }

  return {
    valid: errors.length === 0,
    errors,
    attributes
  };
}

function assignAttribute(
  target: AIAttributeMap,
  name: AIAttributeName,
  value: string | undefined
): void {
  if (value !== undefined && value !== "") {
    target[name] = value;
  }
}

function normalizeStates(state: AIAttributeConfig["state"]): string | undefined {
  if (state === undefined) {
    return undefined;
  }

  return Array.isArray(state) ? state.join(",") : state;
}

function readAttribute(element: AIAttributeElement, name: AIAttributeName): string | undefined {
  if (typeof element.getAttribute === "function") {
    const value = element.getAttribute(name);
    if (value !== null) {
      return value;
    }
  }

  if (element.attributes !== undefined) {
    for (const attribute of element.attributes) {
      if (attribute.name === name) {
        return attribute.value;
      }
    }
  }

  const recordValue = element[name];
  if (typeof recordValue === "string") {
    return recordValue;
  }

  const datasetKey = toDatasetKey(name);
  const datasetValue = element.dataset?.[datasetKey];
  if (datasetValue !== undefined) {
    return datasetValue;
  }

  return undefined;
}

function toDatasetKey(name: AIAttributeName): string {
  return name
    .replace(/^data-/, "")
    .split("-")
    .map((segment, index) =>
      index === 0 ? segment : `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`
    )
    .join("");
}
