<script lang="ts">
  import { Pagination } from "bits-ui";
  import PaginationNextButton from "./pagination-next-button.svelte";
  import PaginationPage from "./pagination-page.svelte";
  import PaginationPrevButton from "./pagination-prev-button.svelte";
  type Props = Pagination.RootProps & { class?: string; children?: never };
  let { ...rest }: Props = $props();
</script>

<Pagination.Root {...rest}>
  {#snippet children({ pages })}
    <div class="flex w-full justify-between">
      <PaginationPrevButton class="font-black">앞</PaginationPrevButton>
      <div class="flex items-center">
        {#each pages as page (page.key)}
          {#if page.type === "ellipsis"}
            <div class="px-1 text-zinc-400">...</div>
          {:else}
            <PaginationPage {page}>{page.value}</PaginationPage>
          {/if}
        {/each}
      </div>
      <PaginationNextButton class="font-black">뒤</PaginationNextButton>
    </div>
  {/snippet}
</Pagination.Root>
