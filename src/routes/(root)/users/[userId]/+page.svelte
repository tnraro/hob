<script lang="ts">
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
  <ul>
    {#each data.solvedProblems as problem}
      <li>
        <a class="flex rounded px-2 py-2 hover:bg-zinc-100" href="/problems/{problem.id}">{problem.title}</a>
      </li>
    {/each}
  </ul>
</section>
