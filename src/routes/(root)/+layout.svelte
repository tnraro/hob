<script lang="ts">
  import { brandName } from "$lib/features/brand/brand-name.js";
  import Button from "$lib/features/button/button.svelte";
  import User from "$lib/features/user/user.svelte";
  let { data, children } = $props();
</script>

<main class="container mx-auto">
  <header class="mb-4 flex items-center justify-between gap-x-4 border-b border-zinc-300 py-2">
    <a href="/">{brandName}</a>
    <div class="flex items-center gap-x-2">
      <div><User id={data.user.id} name={data.user.username} /> 님</div>
      <form method="POST" action="/auth?/logout">
        <Button type="submit" variant="outline">로그아웃</Button>
      </form>
    </div>
  </header>
  {@render children()}
  <footer class="h-dvh"></footer>
</main>
