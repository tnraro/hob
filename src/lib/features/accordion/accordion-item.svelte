<script lang="ts" module>
  import { Accordion } from "bits-ui";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "",
  });
</script>

<script lang="ts">
  type Props = Accordion.ItemProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Accordion.Item class={style({ className })} {...rest}>{@render children?.()}</Accordion.Item>
