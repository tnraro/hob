<script lang="ts" module>
  import { Select } from "bits-ui";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "",
  });
</script>

<script lang="ts">
  type Props = Select.GroupProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Select.Group class={style({ className })} {...rest}>{@render children?.()}</Select.Group>
