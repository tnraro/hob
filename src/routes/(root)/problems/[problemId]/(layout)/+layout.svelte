<script lang="ts">
  import { page } from "$app/state";
  import { buttonStyle } from "$lib/features/button/button.svelte";

  let { data, children } = $props();
</script>

{#if data.hasExplanation}
  {#if data.explanations.length > 0}
    <div class="flex flex-wrap gap-4">
      <nav class="flex min-h-30 max-w-sm flex-col">
        <a href="/problems/{page.params.problemId}/new" class={buttonStyle()}>제출하기</a>
        <ul>
          {#each data.explanations as explanation (explanation.id)}
            <li>
              <a
                href="/problems/{page.params.problemId}/explanations/{explanation.id}"
                class="flex rounded px-2 py-2 hover:bg-zinc-100"
                >{explanation.displayName ?? explanation.username} 님의 풀이</a
              >
            </li>
          {/each}
        </ul>
      </nav>
      {@render children()}
    </div>
  {:else}
    <section class="flex h-30 flex-col items-center justify-center gap-y-2 rounded-2xl bg-zinc-100">
      <h1 class="font-semibold">아직 풀이가 없어요</h1>
      <a href="/problems/{page.params.problemId}/new" class={buttonStyle()}>제출하기</a>
    </section>
  {/if}
{:else}
  <section class="flex h-30 flex-col items-center justify-center gap-y-2 rounded-2xl bg-zinc-100">
    <h1 class="font-semibold">풀이를 제출하면 볼 수 있어요</h1>
    <a href="/problems/{page.params.problemId}/new" class={buttonStyle()}>제출하기</a>
  </section>
{/if}
