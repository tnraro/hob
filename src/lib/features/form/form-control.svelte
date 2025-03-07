<script lang="ts">
  import { Control, type ControlProps } from "formsnap";

  type Props = ControlProps;
  let { children: child, ...rest }: Props = $props();
</script>

<Control {...rest}>
  {#snippet children(item)}
    {@render child?.(item)}
  {/snippet}
</Control>
