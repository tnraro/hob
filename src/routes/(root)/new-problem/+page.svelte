<script lang="ts">
  import { makeTitle } from "$lib/features/brand/title";
  import Button from "$lib/features/button/button.svelte";
  import FormControl from "$lib/features/form/form-control.svelte";
  import FormField from "$lib/features/form/form-field.svelte";
  import FormLabel from "$lib/features/form/form-label.svelte";
  import Input from "$lib/features/input/input.svelte";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { schema } from "./schema.js";

  let { data } = $props();

  const form = superForm(data.form, {
    validators: zodClient(schema),
  });
  const { form: formData, enhance } = form;
</script>

<section>
  <form class="flex flex-col gap-y-4" method="post" use:enhance>
    <div class="grid grid-cols-[max-content_1fr] items-center gap-x-2 gap-y-1">
      <FormField {form} name="url">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel>문제 URL</FormLabel>
            <Input {...props} type="url" required bind:value={$formData.url} placeholder="문제 URL을 복붙해주세요..." />
          {/snippet}
        </FormControl>
      </FormField>
    </div>
    <div>
      <Button type="submit">등록</Button>
    </div>
  </form>
</section>

<svelte:head>
  <title>{makeTitle("새 문제 추가")}</title>
  <meta name="description" content="새 문제 추가 페이지" />
</svelte:head>
