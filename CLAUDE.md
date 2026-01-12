# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun dev          # Start Next.js dev server (port 3000)
bun trigger      # Start Trigger.dev dev server (separate terminal required)
bun build        # Production build
bun lint         # Run ESLint
bun db:push      # Push Drizzle schema to database
bun db:generate  # Generate migration files
bun db:migrate   # Run migrations
bun db:studio    # Open Drizzle Studio
bun email        # Preview email templates
```

**Local development requires two terminals:**
1. `bun dev` (Next.js)
2. `bun trigger` (background job processing)

## Architecture Overview

### Application Type
AI-powered real estate SaaS platform with two core features:
1. **AI Photo Editing** - Transform property photos using Fal.ai style templates
2. **AI Video Creation** - Generate property tour videos from still images

### Multi-Tenant Model
```
User → Workspace (1:1 on signup, can be invited to others)
  ├── Role: owner | admin | member
  ├── Projects (Image editing)
  └── Video Projects
```

### Key Technologies
- **Next.js 16** (App Router) with React 19 and TypeScript 5
- **Drizzle ORM** with PostgreSQL via Supabase
- **Better Auth** for authentication (admin plugin for impersonation)
- **Fal.ai** for AI image/video generation (Nano Banana Pro Edit, FLUX Fill Pro, Kling Video)
- **Trigger.dev** for background job processing
- **Stripe** + **Fiken API** for dual payment system (international + Norwegian B2B invoicing)

### Data Flow Patterns

**Server Actions Pattern**: All mutations use Next.js Server Actions in `lib/actions/`
- `projects.ts` - Project CRUD
- `images.ts` - Image generation workflows
- `video.ts` - Video project management
- `billing.ts` - Invoice management
- `payments.ts` - Stripe checkout

**Background Jobs** (Trigger.dev in `trigger/`):
1. API route initiates job → 2. Job runs async → 3. DB status updated → 4. Frontend polls for updates

**State Management**:
- URL state via `nuqs` (search params)
- Server Actions + `revalidatePath` for data mutations
- No global state library

### Payment Architecture
Two-tier system requiring payment BEFORE AI processing:
- **Stripe** ($99 USD per project) - International/card payments
- **Fiken Invoices** (1000 NOK default) - Norwegian B2B with custom workspace pricing

### Image Versioning
Each edit creates a new version (v1, v2, v3...) linked via `parentId` to the original image.

## Key Files

| File | Purpose |
|------|---------|
| `lib/db/schema.ts` | Complete Drizzle database schema |
| `lib/db/queries.ts` | All database query functions |
| `lib/auth.ts` | Better Auth configuration |
| `lib/style-templates.ts` | AI prompt templates for image editing |
| `trigger/*.ts` | Background job workflows |

## Conventions

### File Naming
- kebab-case for all files: `project-detail-content.tsx`
- Hooks: `use-*.ts` or `use-*.tsx`
- Actions: `*.ts` in `lib/actions/`

### Database Migrations
Never edit existing committed migrations. Create new migrations for schema changes.

### Styling
- Tailwind CSS utility classes
- shadcn/ui components in `components/ui/`
- Tabler Icons (`@tabler/icons-react`)
- Outfit font (primary), Geist Mono (code)

### System Admin
`isSystemAdmin` field on user grants access to admin panel (`/admin/*`) across all workspaces.


<!-- TRIGGER.DEV basic START -->
# Trigger.dev Basic Tasks (v4)

**MUST use `@trigger.dev/sdk`, NEVER `client.defineJob`**

## Basic Task

```ts
import { task } from "@trigger.dev/sdk";

export const processData = task({
  id: "process-data",
  retry: {
    maxAttempts: 10,
    factor: 1.8,
    minTimeoutInMs: 500,
    maxTimeoutInMs: 30_000,
    randomize: false,
  },
  run: async (payload: { userId: string; data: any[] }) => {
    // Task logic - runs for long time, no timeouts
    console.log(`Processing ${payload.data.length} items for user ${payload.userId}`);
    return { processed: payload.data.length };
  },
});
```

## Schema Task (with validation)

```ts
import { schemaTask } from "@trigger.dev/sdk";
import { z } from "zod";

export const validatedTask = schemaTask({
  id: "validated-task",
  schema: z.object({
    name: z.string(),
    age: z.number(),
    email: z.string().email(),
  }),
  run: async (payload) => {
    // Payload is automatically validated and typed
    return { message: `Hello ${payload.name}, age ${payload.age}` };
  },
});
```

## Triggering Tasks

### From Backend Code

```ts
import { tasks } from "@trigger.dev/sdk";
import type { processData } from "./trigger/tasks";

// Single trigger
const handle = await tasks.trigger<typeof processData>("process-data", {
  userId: "123",
  data: [{ id: 1 }, { id: 2 }],
});

// Batch trigger (up to 1,000 items, 3MB per payload)
const batchHandle = await tasks.batchTrigger<typeof processData>("process-data", [
  { payload: { userId: "123", data: [{ id: 1 }] } },
  { payload: { userId: "456", data: [{ id: 2 }] } },
]);
```

### Debounced Triggering

Consolidate multiple triggers into a single execution:

```ts
// Multiple rapid triggers with same key = single execution
await myTask.trigger(
  { userId: "123" },
  {
    debounce: {
      key: "user-123-update",  // Unique key for debounce group
      delay: "5s",              // Wait before executing
    },
  }
);

// Trailing mode: use payload from LAST trigger
await myTask.trigger(
  { data: "latest-value" },
  {
    debounce: {
      key: "trailing-example",
      delay: "10s",
      mode: "trailing",  // Default is "leading" (first payload)
    },
  }
);
```

**Debounce modes:**
- `leading` (default): Uses payload from first trigger, subsequent triggers only reschedule
- `trailing`: Uses payload from most recent trigger

### From Inside Tasks (with Result handling)

```ts
export const parentTask = task({
  id: "parent-task",
  run: async (payload) => {
    // Trigger and continue
    const handle = await childTask.trigger({ data: "value" });

    // Trigger and wait - returns Result object, NOT task output
    const result = await childTask.triggerAndWait({ data: "value" });
    if (result.ok) {
      console.log("Task output:", result.output); // Actual task return value
    } else {
      console.error("Task failed:", result.error);
    }

    // Quick unwrap (throws on error)
    const output = await childTask.triggerAndWait({ data: "value" }).unwrap();

    // Batch trigger and wait
    const results = await childTask.batchTriggerAndWait([
      { payload: { data: "item1" } },
      { payload: { data: "item2" } },
    ]);

    for (const run of results) {
      if (run.ok) {
        console.log("Success:", run.output);
      } else {
        console.log("Failed:", run.error);
      }
    }
  },
});

export const childTask = task({
  id: "child-task",
  run: async (payload: { data: string }) => {
    return { processed: payload.data };
  },
});
```

> Never wrap triggerAndWait or batchTriggerAndWait calls in a Promise.all or Promise.allSettled as this is not supported in Trigger.dev tasks.

## Waits

```ts
import { task, wait } from "@trigger.dev/sdk";

export const taskWithWaits = task({
  id: "task-with-waits",
  run: async (payload) => {
    console.log("Starting task");

    // Wait for specific duration
    await wait.for({ seconds: 30 });
    await wait.for({ minutes: 5 });
    await wait.for({ hours: 1 });
    await wait.for({ days: 1 });

    // Wait until specific date
    await wait.until({ date: new Date("2024-12-25") });

    // Wait for token (from external system)
    await wait.forToken({
      token: "user-approval-token",
      timeoutInSeconds: 3600, // 1 hour timeout
    });

    console.log("All waits completed");
    return { status: "completed" };
  },
});
```

> Never wrap wait calls in a Promise.all or Promise.allSettled as this is not supported in Trigger.dev tasks.

## Key Points

- **Result vs Output**: `triggerAndWait()` returns a `Result` object with `ok`, `output`, `error` properties - NOT the direct task output
- **Type safety**: Use `import type` for task references when triggering from backend
- **Waits > 5 seconds**: Automatically checkpointed, don't count toward compute usage
- **Debounce + idempotency**: Idempotency keys take precedence over debounce settings

## NEVER Use (v2 deprecated)

```ts
// BREAKS APPLICATION
client.defineJob({
  id: "job-id",
  run: async (payload, io) => {
    /* ... */
  },
});
```

Use SDK (`@trigger.dev/sdk`), check `result.ok` before accessing `result.output`

<!-- TRIGGER.DEV basic END -->