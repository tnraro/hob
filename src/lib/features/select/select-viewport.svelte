<script lang="ts" module>
  import { Select } from "bits-ui";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "",
  });
</script>

<script lang="ts">
  type Props = Select.ViewportProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Select.Viewport class={style({ className })} {...rest}>{@render children?.()}</Select.Viewport>
