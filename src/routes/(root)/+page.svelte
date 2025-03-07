<script lang="ts">
  import { makeTitle } from "$lib/features/brand/title.js";
  import { buttonStyle } from "$lib/features/button/button.svelte";

  let { data } = $props();
</script>

<section>
  <a href="/new-problem" class={buttonStyle()}>문제를 풀었어요</a>
</section>
<section class="mt-8">
  <h1 class="font-bold">문제 목록</h1>
  <nav class="min-h-30">
    <ul>
      {#each data.problems as problem (problem.id)}
        <li>
          <a class="flex rounded px-2 py-2 hover:bg-zinc-100" href="/problems/{problem.id}">
            {problem.title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</section>

<svelte:head>
  <title>{makeTitle()}</title>
  <meta name="description" content="랜딩 페이지" />
</svelte:head>
