<script lang="ts" module>
  import { Select } from "bits-ui";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "flex items-center px-2 py-1 select-none data-disabled:opacity-50 data-highlighted:bg-zinc-100",
  });
</script>

<script lang="ts">
  type Props = Select.ItemProps & { class?: string };
  let { children: child, class: className, ...rest }: Props = $props();
</script>

<Select.Item class={style({ className })} {...rest}>
  {#snippet children(item)}
    {@render child?.(item)}
  {/snippet}
</Select.Item>
