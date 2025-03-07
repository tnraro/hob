<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/features/button/button.svelte";
  import Tiptap from "$lib/features/tiptap/tiptap.svelte";
  import User from "$lib/features/user/user.svelte";

  let { data } = $props();
</script>

<div class="flex flex-1 flex-col gap-4">
  <article>
    <h1 class="pl-4">
      <User
        id={data.explanation.authorId}
        displayName={data.explanation.displayName}
        name={data.explanation.username}
      /> 님이 작성
    </h1>
    {#key data.explanation.content}
      <Tiptap content={data.explanation.content} editable={false} />
    {/key}
  </article>
  <section>
    {#each data.comments as comment (comment.id)}
      <section>
        <div class="flex items-end gap-x-4">
          <User id={comment.authorId} displayName={comment.displayName} name={comment.username} />
          <div class="flex items-end gap-x-1">
            {#if comment.authorId === data.user.id}
              <form method="post" action="?/delete-comment" use:enhance class="flex items-end">
                <input type="hidden" name="id" value={comment.id} />
                <button type="submit" class="cursor-pointer text-xs text-red-700">삭제</button>
              </form>
            {/if}
          </div>
        </div>
        <div>
          {@html comment.content}
        </div>
      </section>
    {/each}
  </section>
  <section>
    <form class="flex flex-col gap-y-2" method="post" action="?/comment" use:enhance>
      <Tiptap name="content" placeholder="의견을 입력해주세요..." />
      <div class="flex justify-end">
        <Button type="submit">전송</Button>
      </div>
    </form>
  </section>
</div>
