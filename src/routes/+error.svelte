<script lang="ts">
  import { page } from "$app/state";
  import { brandName } from "$lib/features/brand/brand-name";
  import Button from "$lib/features/button/button.svelte";
</script>

<main class="container mx-auto flex h-dvh flex-col">
  <header class="mb-4 flex items-center justify-between gap-x-4 border-b border-zinc-300 py-2">
    <a href="/">{brandName}</a>
  </header>
  <section class="flex flex-1 flex-col items-center justify-center gap-y-4">
    <h1 class="text-center font-black">
      <div class="text-4xl">
        {page.status}
      </div>
      <div class="text-2xl">
        {page.error?.message}
      </div>
    </h1>
    <Button variant="outline" onclick={() => history.back()}>뒤로가기</Button>
  </section>
</main>
