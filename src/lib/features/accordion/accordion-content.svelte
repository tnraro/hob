<script lang="ts" module>
  import { Accordion } from "bits-ui";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "",
  });
</script>

<script lang="ts">
  type Props = Accordion.ContentProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Accordion.Content class={style({ className })} {...rest}>{@render children?.()}</Accordion.Content>
