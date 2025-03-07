<script lang="ts" module>
  import { FieldErrors, type FieldErrorsProps } from "formsnap";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "flex flex-col gap-2",
  });
</script>

<script lang="ts">
  type Props = FieldErrorsProps & { class?: string; children?: never };
  let { class: className, ...rest }: Props = $props();
</script>

<FieldErrors class={style({ className })} {...rest}>
  {#snippet children({ errors, errorProps })}
    {#each errors as error}
      <div class="rounded-lg bg-red-50 px-4 py-2 text-red-600" {...errorProps}>{error}</div>
    {/each}
  {/snippet}
</FieldErrors>
