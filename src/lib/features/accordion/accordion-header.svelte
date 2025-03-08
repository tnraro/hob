<script lang="ts" module>
  import { Accordion } from "bits-ui";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "",
  });
</script>

<script lang="ts">
  type Props = Accordion.HeaderProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Accordion.Header class={style({ className })} {...rest}>{@render children?.()}</Accordion.Header>
