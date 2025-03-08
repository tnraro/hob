<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import List from "$lib/features/list/list.svelte";
  import ProblemItem from "$lib/features/list/problem-item.svelte";
  import User from "$lib/features/user/user.svelte";

  let { data } = $props();
</script>

<section>
  <User id={data.targetUser.id} displayName={data.targetUser.displayName} name={data.targetUser.username} />
  <div>
    푼 문제: {data.solvedProblems.length} 개
  </div>
  <div>
    작성한 의견: {data.wroteComments.length} 개
  </div>
</section>

<section>
  <h1 class="font-bold">푼 문제</h1>
  <List
    class="min-h-100"
    items={data.solvedProblems}
    count={data.solvedProblemCount}
    perPage={10}
    bind:page={
      () => Number(page.url.searchParams.get("sp_page") ?? 1),
      (value) => {
        const url = new URL(page.url);
        if (value === 1) {
          url.searchParams.delete("sp_page");
        } else {
          url.searchParams.set("sp_page", String(value));
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
