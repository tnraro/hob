<script lang="ts">
  import { enhance } from "$app/forms";
  import { makeTitle } from "$lib/features/brand/title";
  import Button from "$lib/features/button/button.svelte";
  import Label from "$lib/features/label/label.svelte";
  import Tiptap from "$lib/features/tiptap/tiptap.svelte";
</script>

<section>
  <form class="flex flex-col gap-y-4" method="post" use:enhance>
    <div>
      <Label for="content">풀이</Label>
      <Tiptap name="content" placeholder="풀이를 자유롭게 작성해주세요..." />
    </div>
    <div class="flex justify-end">
      <Button type="submit">등록</Button>
    </div>
  </form>
</section>

<svelte:head>
  <title>{makeTitle("새 풀이 추가")}</title>
  <meta name="description" content="새 풀이 추가 페이지" />
</svelte:head>
