<script lang="ts" module>
  import { FieldErrors, type FieldErrorsProps } from "formsnap";
  import { tv } from "tailwind-variants";

  const style = tv({
    slots: {
      base: "flex flex-col gap-2",
      error: "inline-flex h-8 items-center rounded bg-red-50 px-3 text-red-600",
    },
  });
</script>

<script lang="ts">
  type Props = FieldErrorsProps & { class?: string; errorClass?: string; children?: never };
  let { class: className, errorClass, ...rest }: Props = $props();

  let _style = $derived(style());
</script>

<FieldErrors class={_style.base({ className })} {...rest}>
  {#snippet children({ errors, errorProps })}
    {#each errors as error}
      <div class={_style.error({ className: errorClass })} {...errorProps}>{error}</div>
    {/each}
  {/snippet}
</FieldErrors>
