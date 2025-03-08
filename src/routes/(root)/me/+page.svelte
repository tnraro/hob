<script lang="ts">
  import Button from "$lib/features/button/button.svelte";
  import FormControl from "$lib/features/form/form-control.svelte";
  import FormField from "$lib/features/form/form-field.svelte";
  import FormLabel from "$lib/features/form/form-label.svelte";
  import Input from "$lib/features/input/input.svelte";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";

  let { data } = $props();

  const form = superForm(data.form, {
    validators: zodClient(schema),
  });
  const { form: formData, enhance } = form;
</script>

<div>
  <form method="post" use:enhance class="flex flex-col items-start gap-y-1">
    <FormField {form} name="username">
      <FormControl>
        {#snippet children({ props })}
          <FormLabel>유저명</FormLabel>
          <Input {...props} bind:value={$formData.username} placeholder={data.user.username} />
        {/snippet}
      </FormControl>
    </FormField>
    <FormField {form} name="displayName">
      <FormControl>
        {#snippet children({ props })}
          <FormLabel>별명 (보이는 이름)</FormLabel>
          <Input {...props} value={data.user.displayName} placeholder={data.user.username} />
        {/snippet}
      </FormControl>
    </FormField>
    <Button type="submit" formaction="?/update">수정</Button>
  </form>
</div>
