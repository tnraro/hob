<script lang="ts" module>
  import type { problems } from "$lib/server/db/schema";
  import type { SvelteHTMLElements } from "svelte/elements";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "flex items-center gap-x-4 rounded px-2 py-2 select-none hover:bg-zinc-100",
  });
</script>

<script lang="ts">
  type Props = SvelteHTMLElements["a"] & {
    class?: string;
    children?: never;
    problem: Partial<typeof problems.$inferSelect> & Pick<typeof problems.$inferSelect, "id" | "title">;
  };
  let { class: className, problem, ...rest }: Props = $props();
</script>

<a class={style({ className })} href="/problems/{problem.id}" {...rest}>
  <span>
    {#if problem.no != null}
      {problem.no}{". "}
    {/if}
    {problem.title}
  </span>
  {#if problem.difficulty != null}
    <span class="rounded bg-zinc-100 px-1 text-xs text-zinc-800">{problem.difficulty}</span>
  {/if}
</a>
