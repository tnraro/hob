<script lang="ts" module>
  import { Select } from "bits-ui";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "",
  });
</script>

<script lang="ts">
  type Props = Select.PortalProps;
  let { children, ...rest }: Props = $props();
</script>

<Select.Portal {...rest}>{@render children?.()}</Select.Portal>
