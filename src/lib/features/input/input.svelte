<script lang="ts" module>
  import type { HTMLInputAttributes } from "svelte/elements";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "h-8 rounded border border-zinc-300 px-3 placeholder-zinc-400 shadow-xs placeholder:text-sm focus:ring focus:outline-none",
  });
</script>

<script lang="ts">
  type Props = HTMLInputAttributes & { class?: string };
  let { children, class: className, value = $bindable(), ...rest }: Props = $props();
</script>

<input class={style({ className })} bind:value {...rest} />
