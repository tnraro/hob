<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { makeTitle } from "$lib/features/brand/title.js";
  import { buttonStyle } from "$lib/features/button/button.svelte";
  import List from "$lib/features/list/list.svelte";
  import ProblemItem from "$lib/features/list/problem-item.svelte";

  let { data } = $props();
</script>

<section>
  <a href="/new-problem" class={buttonStyle()}>문제를 풀었어요</a>
</section>
<section class="mt-8">
  <h1 class="font-bold">문제 목록</h1>
  <List
    class="min-h-100"
    items={data.problems}
    count={data.problemCount}
    perPage={10}
    bind:page={
      () => Number(page.url.searchParams.get("page") ?? 1),
      (value) => {
        const url = new URL(page.url);
        if (value === 1) {
          url.searchParams.delete("page");
        } else {
          url.searchParams.set("page", String(value));
        }
        goto(url);
      }
    }
  >
    {#snippet children(problem)}
      <ProblemItem {problem} />
    {/snippet}
  </List>
</section>

<svelte:head>
  <title>{makeTitle()}</title>
  <meta name="description" content="랜딩 페이지" />
</svelte:head>
