import type { SessionValidationResult } from "$lib/server/auth";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      user: SessionValidationResult["user"];
      session: SessionValidationResult["session"];
    }
  }
}

export {};
