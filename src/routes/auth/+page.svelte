<script lang="ts">
  import { brandName } from "$lib/features/brand/brand-name.js";
  import { makeTitle } from "$lib/features/brand/title";
  import Button from "$lib/features/button/button.svelte";
  import FormControl from "$lib/features/form/form-control.svelte";
  import FormDescription from "$lib/features/form/form-description.svelte";
  import FormFieldErrors from "$lib/features/form/form-field-errors.svelte";
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

<main class="mx-auto max-w-sm">
  <header class="py-2">
    <h1>{brandName} 로그인 / 가입</h1>
  </header>
  <form method="post" action="?/login" use:enhance class="flex flex-col gap-y-4">
    <FormField {form} name="username">
      <div class="flex flex-col">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel>유저명</FormLabel>
            <Input {...props} bind:value={$formData.username} required placeholder="유저명을 입력해주세요..." />
          {/snippet}
        </FormControl>
        <FormDescription><code class="font-mono text-xs text-red-800">{"/^[a-z0-9_-]{3,31}$/"}</code></FormDescription>
        <FormFieldErrors />
      </div>
    </FormField>
    <FormField {form} name="password">
      <div class="flex flex-col">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel>비밀번호</FormLabel>
            <Input
              {...props}
              type="password"
              required
              bind:value={$formData.password}
              placeholder="스위스 비말계좌를 입력해주세요..."
            />
          {/snippet}
        </FormControl>
        <FormDescription><code class="font-mono text-xs text-red-800">{"/^.{6,65535}$/"}</code></FormDescription>
        <FormFieldErrors />
      </div>
    </FormField>
    <div class="flex flex-wrap gap-2">
      <Button class="flex-1 basis-47" type="submit">로그인</Button>
      <Button class="flex-1 basis-47" type="submit" formaction="?/register" variant="secondary">가입</Button>
    </div>
  </form>
</main>

<svelte:head>
  <title>{makeTitle("로그인")}</title>
  <meta name="description" content="로그인 또는 가입 페이지" />
</svelte:head>
