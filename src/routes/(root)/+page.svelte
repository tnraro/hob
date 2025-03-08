<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { makeTitle } from "$lib/features/brand/title.js";
  import { buttonStyle } from "$lib/features/button/button.svelte";
  import Pagination from "$lib/features/pagination/pagination.svelte";

  let { data } = $props();
</script>

<section>
  <a href="/new-problem" class={buttonStyle()}>문제를 풀었어요</a>
</section>
<section class="mt-8">
  <h1 class="font-bold">문제 목록</h1>
  <nav class="min-h-100">
    <ul>
      {#each data.problems as problem (problem.id)}
        <li>
          <a
            class="flex items-center gap-x-4 rounded px-2 py-2 select-none hover:bg-zinc-100"
            href="/problems/{problem.id}"
          >
            <span>
              {#if problem.no != null}
                {problem.no}{". "}
              {/if}
              {problem.title}
            </span>
            <span class="rounded bg-zinc-100 px-1 text-xs text-zinc-800">{problem.difficulty}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  <div class="mx-auto max-w-70">
    <Pagination
      count={data.problemCount}
      perPage={10}
      page={Number(page.url.searchParams.get("page") ?? 1)}
      onPageChange={(value) => {
        const url = new URL(page.url);
        url.searchParams.set("page", String(value));
        goto(url);
      }}
    />
  </div>
</section>

<svelte:head>
  <title>{makeTitle()}</title>
  <meta name="description" content="랜딩 페이지" />
</svelte:head>
