<script lang="ts" module>
  import { Accordion } from "bits-ui";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "inline-flex h-8 w-full items-center bg-transparent px-3 font-semibold text-zinc-800 hover:bg-zinc-100/95 focus:ring focus:outline-none active:transition-all data-[state=open]:bg-zinc-100",
  });
</script>

<script lang="ts">
  type Props = Accordion.TriggerProps & { class?: string };
  let { children, class: className, ...rest }: Props = $props();
</script>

<Accordion.Trigger class={style({ className })} {...rest}>{@render children?.()}</Accordion.Trigger>
