<script lang="ts" module>
  import { Pagination } from "bits-ui";
  import { tv } from "tailwind-variants";
  import { buttonStyle } from "../button/button.svelte";

  const style = tv({
    base: "",
  });
</script>

<script lang="ts">
  type Props = Pagination.PrevButtonProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Pagination.PrevButton
  class={buttonStyle({
    variant: "ghost",
    shape: "icon",
    className: "data-selected:bg-zinc-900 data-selected:text-white " + className,
  })}
  {...rest}
>
  {@render children?.()}
</Pagination.PrevButton>
