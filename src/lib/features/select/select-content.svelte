<script lang="ts" module>
  import { Select } from "bits-ui";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "z-50 max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] rounded border border-zinc-300 bg-white p-1 shadow-2xl outline-none select-none data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
  });
</script>

<script lang="ts">
  type Props = Select.ContentProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Select.Content class={style({ className })} {...rest}>{@render children?.()}</Select.Content>
