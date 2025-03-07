<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>, M = any">
  import { Field, type FieldProps } from "formsnap";
  import type { FormPath } from "sveltekit-superforms";

  type Props = FieldProps<T, U, M>;
  let { children: child, ...rest }: Props = $props();
</script>

<Field {...rest}>
  {#snippet children(item)}
    {@render child?.(item)}
  {/snippet}
</Field>
