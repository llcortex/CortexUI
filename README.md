# CortexUI

[![npm version](https://img.shields.io/npm/v/@cortexui/components?label=%40cortexui%2Fcomponents&color=0ea5e9)](https://www.npmjs.com/package/@cortexui/components)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> The design system that makes web interfaces visually usable for humans and programmatically operable by AI agents.

---

## What is CortexUI?

CortexUI is an AI-native design system built for the era of agentic software. Every component has two layers:

- **Visual layer** — a polished, accessible UI for human users
- **Semantic layer** — a machine-readable contract for AI agents

The semantic layer is implemented via `data-ai-*` attributes baked directly into every component. These attributes express an element's identity, role, intent, and current state in a way that is stable, unambiguous, and does not require a trained model to interpret.

CortexUI is not just a component library. It is an **interaction contract** — a shared language between your UI and the AI agents that operate it.

---

## The Problem

AI agents that interact with web interfaces today rely on brittle strategies:

- **DOM scraping** — reading raw HTML and hoping structure doesn't change
- **Unstable CSS selectors** — `div.container > ul > li:nth-child(3) > button`
- **Guessing from visible text** — assuming a button labelled "OK" means "confirm"
- **Heuristics and model inference** — letting a language model guess what might happen

This approach fails in production. Selectors break with every redesign. Text labels are ambiguous. State is invisible. The result is flaky automation, wrong actions, and low reliability.

---

## The Solution

CortexUI solves this by making the interface self-describing. Every interactive element declares its identity and intent via `data-ai-*` attributes:

```html
<button
  data-ai-id="save-profile"
  data-ai-role="action"
  data-ai-action="save-profile"
  data-ai-state="idle"
>
  Save Profile
</button>
```

And the runtime API lets agents inspect the entire screen programmatically:

```js
const actions = window.__CORTEX_UI__.getAvailableActions();
// [{ id: "save-profile", action: "save-profile", state: "idle", section: "profile-form" }]
```

An agent no longer needs to guess. It queries the contract, gets a deterministic answer, and acts on it.

---

## Packages

| Package | npm | Version | Description |
|---|---|---|---|
| `ai-contract` | [`@cortexui/ai-contract`](https://www.npmjs.com/package/@cortexui/ai-contract) | 1.1.1 | `data-ai-*` attribute specification, TypeScript types, and validators |
| `components` | [`@cortexui/components`](https://www.npmjs.com/package/@cortexui/components) | 1.1.1 | React components with built-in AI contracts |
| `primitives` | [`@cortexui/primitives`](https://www.npmjs.com/package/@cortexui/primitives) | 1.1.1 | Low-level accessible primitives (Box, Stack, Text, ButtonBase, InputBase, DialogBase) |
| `runtime` | [`@cortexui/runtime`](https://www.npmjs.com/package/@cortexui/runtime) | 1.1.1 | Browser runtime that installs `window.__CORTEX_UI__` |
| `testing` | [`@cortexui/testing`](https://www.npmjs.com/package/@cortexui/testing) | 1.1.1 | Contract validation utilities and vitest matchers |
| `tokens` | [`@cortexui/tokens`](https://www.npmjs.com/package/@cortexui/tokens) | 1.1.1 | Design tokens — colors, spacing, typography, radius |

---

## Installation

Install the main component package and the runtime:

```bash
# npm
npm install @cortexui/components @cortexui/runtime

# pnpm
pnpm add @cortexui/components @cortexui/runtime

# yarn
yarn add @cortexui/components @cortexui/runtime
```

Peer dependencies: `react@^18`, `react-dom@^18`.

---

## Quick Start

```tsx
import { ActionButton } from '@cortexui/components';
import { installCortexUIRuntime } from '@cortexui/runtime';

// Install the runtime once at app entry
installCortexUIRuntime(window);

// Render a component
export function ProfileForm() {
  return (
    <ActionButton
      action="save-profile"
      state="idle"
      label="Save Profile"
      onClick={handleSave}
    />
  );
}
```

The rendered HTML will be:

```html
<button
  data-ai-id="save-profile"
  data-ai-role="action"
  data-ai-action="save-profile"
  data-ai-state="idle"
>
  Save Profile
</button>
```

An AI agent can now call `window.__CORTEX_UI__.getAvailableActions()` and get back exactly this button — no DOM scraping required.

---

## Documentation

Full documentation lives in the `apps/docs` site.

To run it locally:

```bash
pnpm dev
# Docs available at http://localhost:3001
```

Or run docs only:

```bash
pnpm --filter @cortexui/docs dev
```

---

## Package Overview

### @cortexui/ai-contract

The specification layer. Defines all `data-ai-*` attribute names as constants, TypeScript types for roles, states, events, and the `AIAttributeMap` type. Includes `validateAIAttributes()` and `extractAIAttributes()` for programmatic use.

```ts
import { DATA_AI_ROLE, DATA_AI_STATE, validateAIAttributes } from '@cortexui/ai-contract';

const result = validateAIAttributes(element);
// { valid: true, errors: [], attributes: { role: 'action', state: 'idle', ... } }
```

### @cortexui/components

Production-ready React components. Each component automatically outputs the correct `data-ai-*` attributes. No manual annotation needed.

```tsx
import { ActionButton, FormField, DataTable, StatusBanner, ConfirmDialog } from '@cortexui/components';

<ActionButton action="delete-order" state="idle" label="Delete Order" />
<FormField id="email" fieldType="email" label="Email" required />
```

### @cortexui/primitives

Low-level building blocks. Handles behavior, accessibility, and layout. Does not add `data-ai-*` attributes — that responsibility lives in the component layer. Use primitives when building custom components that need CortexUI's accessibility guarantees.

```tsx
import { Box, Stack, Text, ButtonBase } from '@cortexui/primitives';

<Stack direction="column" gap="16px">
  <Text as="label" size="sm" weight="medium">Name</Text>
  <ButtonBase data-ai-role="action" data-ai-id="confirm" data-ai-state="idle">
    Confirm
  </ButtonBase>
</Stack>
```

### @cortexui/runtime

Installs `window.__CORTEX_UI__` — a structured inspection API for the current screen. AI agents call this instead of scraping the DOM.

```ts
import { installCortexUIRuntime } from '@cortexui/runtime';

installCortexUIRuntime(window);

// Available immediately after installation:
window.__CORTEX_UI__.getScreenContext();
window.__CORTEX_UI__.getAvailableActions();
window.__CORTEX_UI__.getFormSchema('contact-form');
```

### @cortexui/tokens

Design tokens as JavaScript objects and TypeScript types. Colors, spacing, radius, and typography — the single source of truth for CortexUI's visual design.

```ts
import { colorTokens, spacingTokens } from '@cortexui/tokens';

console.log(colorTokens.values.accent); // "#111827"
```

### @cortexui/testing

Vitest matchers and validation utilities for verifying AI contract compliance in tests.

```ts
import { registerCortexMatchers } from '@cortexui/testing';
import { expect } from 'vitest';

registerCortexMatchers(expect);

expect(element).toBeAIContractValid();
expect(element).toHaveAIAttributes({ 'data-ai-role': 'action', 'data-ai-state': 'idle' });
```

---

## Runtime API

The full `window.__CORTEX_UI__` API with TypeScript types:

```ts
interface CortexUIRuntime {
  /** Returns screen-level context: which screen is active, what entity is in view. */
  getScreenContext(): {
    screen: string | null;
    entity: string | null;
    entityId: string | null;
    sections: string[];
  };

  /** Returns every actionable element currently rendered and interactive. */
  getAvailableActions(): Array<{
    id: string;
    action: string;
    state: string;
    section: string | null;
  }>;

  /** Returns the field schema for a given form by its data-ai-id. */
  getFormSchema(formId: string): {
    formId: string;
    fields: Array<{
      id: string;
      fieldType: string;
      required: boolean;
      currentValue: string | null;
      state: string;
    }>;
  } | null;

  /** Returns all entity-carrying elements visible in the current viewport. */
  getVisibleEntities(): Array<{
    entity: string;
    entityId: string | null;
    section: string | null;
  }>;

  /** Returns a log of recent interaction events. */
  getRecentEvents(): Array<{
    type: 'action_triggered' | 'action_completed' | 'action_failed' | 'form_submitted' | 'field_updated';
    actionId?: string;
    formId?: string;
    fieldId?: string;
    result?: 'success' | 'error';
    message?: string;
    timestamp: number;
  }>;
}

declare global {
  interface Window {
    __CORTEX_UI__: CortexUIRuntime;
  }
}
```

---

## Philosophy

CortexUI is built on a simple idea: **AI agents shouldn't have to guess what a UI does. Every element should declare its identity, role, and intent.**

A visually rendered button tells a human "click me to save." A `data-ai-action="save-profile"` attribute tells an AI agent the same thing — unambiguously, regardless of label text, icon, or layout.

This is not a workaround. It is the right model. The web has always used semantic HTML to describe meaning (`<nav>`, `<main>`, `<button>`). CortexUI extends that principle to the interaction layer, giving AI agents the same semantic clarity that screen readers have had for decades.

[Read the full philosophy in the docs.](http://localhost:3001/docs/philosophy)

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, commit conventions, the AI contract compliance checklist, and how to add new components.

---

## License

MIT — see [LICENSE](./LICENSE).
