<script lang="ts" module>
  import { Description, type DescriptionProps } from "formsnap";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "",
  });
</script>

<script lang="ts">
  type Props = DescriptionProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Description class={style({ className })} {...rest}>
  {@render children?.()}
</Description>
