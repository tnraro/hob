<script lang="ts">
  import { makeTitle } from "$lib/features/brand/title";
  import Button from "$lib/features/button/button.svelte";
  import FormControl from "$lib/features/form/form-control.svelte";
  import FormField from "$lib/features/form/form-field.svelte";
  import FormLabel from "$lib/features/form/form-label.svelte";
  import Input from "$lib/features/input/input.svelte";
  import Label from "$lib/features/label/label.svelte";
  import { parsePsUrl } from "$lib/features/ps/parse-ps-url";
  import Tiptap from "$lib/features/tiptap/tiptap.svelte";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { schema } from "./schema.js";

  let { data } = $props();

  let titleSuggestion = $state<string>();

  const form = superForm(data.form, {
    validators: zodClient(schema),
  });
  const { form: formData, enhance } = form;

  $effect(() => {
    if (!$formData.title && titleSuggestion) {
      $formData.title = titleSuggestion;
    }
  });
</script>

<section>
  <form class="flex flex-col gap-y-4" method="post" use:enhance>
    <div class="grid grid-cols-[max-content_1fr] items-center gap-x-2 gap-y-1">
      <FormField {form} name="url">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel>문제 URL</FormLabel>
            <Input
              {...props}
              type="url"
              required
              value={$formData.url}
              onchange={(e) => {
                const x = parsePsUrl(e.currentTarget.value.trim());
                $formData.url = x.url;
                titleSuggestion = x.title;
              }}
              placeholder="문제 URL을 복붙해주세요..."
            />
          {/snippet}
        </FormControl>
      </FormField>
      <FormField {form} name="title">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel>문제 제목 <span class="text-xs text-zinc-700">(선택)</span></FormLabel>
            <Input {...props} bind:value={$formData.title} placeholder="문제 제목을 입력해주세요..." />
          {/snippet}
        </FormControl>
      </FormField>
      <FormField {form} name="no">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel>문제 번호 <span class="text-xs text-zinc-700">(선택)</span></FormLabel>
            <div>
              <Input {...props} type="number" bind:value={$formData.no} placeholder="문제 번호" />
            </div>
          {/snippet}
        </FormControl>
      </FormField>
    </div>
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
  <title>{makeTitle("새 문제 추가")}</title>
  <meta name="description" content="새 문제 추가 페이지" />
</svelte:head>
