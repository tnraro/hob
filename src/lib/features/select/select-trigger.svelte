<script lang="ts" module>
  import { Select } from "bits-ui";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "h-8 min-w-20 rounded border border-zinc-300 bg-white px-3 text-left shadow-xs select-none focus:ring focus:outline-none data-placeholder:text-sm data-placeholder:text-zinc-400",
  });
</script>

<script lang="ts">
  type Props = Select.TriggerProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Select.Trigger class={style({ className })} {...rest}>{@render children?.()}</Select.Trigger>
