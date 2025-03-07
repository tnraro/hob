<script lang="ts" module>
  import { Label, type LabelProps } from "formsnap";
  import { labelStyle } from "../label/label.svelte";
</script>

<script lang="ts">
  type Props = LabelProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Label class={labelStyle({ className: "data-fs-error:text-red-600 " + className })} {...rest}>
  {@render children?.()}
</Label>
