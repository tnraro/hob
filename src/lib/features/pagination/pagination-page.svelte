<script lang="ts" module>
  import { Pagination } from "bits-ui";
  import { buttonStyle } from "../button/button.svelte";
</script>

<script lang="ts">
  type Props = Pagination.PageProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Pagination.Page
  class={buttonStyle({
    variant: "ghost",
    shape: "icon",
    className: "data-selected:bg-zinc-900 data-selected:text-white " + className,
  })}
  {...rest}
>
  {@render children?.()}
</Pagination.Page>
