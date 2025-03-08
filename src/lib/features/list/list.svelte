<script lang="ts" module>
  import type { Snippet } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";
  import { tv } from "tailwind-variants";
  import Pagination from "../pagination/pagination.svelte";

  const style = tv({});
</script>

<script lang="ts" generics="T">
  type Props = {
    count: number;
    perPage: number;
    page: number;
    items: T[];
    class?: string;
    children?: Snippet<[T]>;
  } & Omit<SvelteHTMLElements["div"], "children">;
  let { count, perPage, page = $bindable(), items, children, class: className, ...rest }: Props = $props();
</script>

<div class={style({ className })} {...rest}>
  <ul>
    {#each items as item}
      <li>
        {@render children?.(item)}
      </li>
    {/each}
  </ul>
  {#if count > perPage}
    <div class="mx-auto max-w-70">
      <Pagination {count} {perPage} {page} onPageChange={(value) => (page = value)} />
    </div>
  {/if}
</div>
