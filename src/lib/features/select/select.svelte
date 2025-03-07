<script lang="ts" module>
  import { Select } from "bits-ui";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "",
  });
</script>

<script lang="ts">
  type Props = Select.RootProps;
  let { children, value = $bindable(), ...rest }: Props = $props();
</script>

<Select.Root bind:value {...rest}>{@render children?.()}</Select.Root>
