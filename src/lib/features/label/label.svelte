<script lang="ts" module>
  import { Label } from "bits-ui";
  import { tv } from "tailwind-variants";

  export const labelStyle = tv({
    base: "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  });
</script>

<script lang="ts">
  type Props = Label.RootProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Label.Root class={labelStyle({ className })} {...rest}>{@render children?.()}</Label.Root>
