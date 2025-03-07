<script lang="ts" module>
  import { Button } from "bits-ui";
  import { tv, type VariantProps } from "tailwind-variants";

  export const buttonStyle = tv({
    base: "inline-flex h-8 items-center justify-center rounded px-3 font-semibold shadow-xs focus:ring focus:outline-none active:scale-98 active:transition-all",
    variants: {
      variant: {
        primary: "bg-zinc-900 text-white hover:bg-zinc-900/95 focus:ring-black focus:ring-offset-1",
        secondary: "bg-zinc-200 text-zinc-800 hover:bg-zinc-200/95",
        outline: "border border-zinc-300 bg-transparent text-zinc-800 hover:bg-zinc-100/95",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  });
</script>

<script lang="ts">
  type Props = Button.RootProps & VariantProps<typeof buttonStyle> & { class?: string };
  let { children, class: className, variant, ...rest }: Props = $props();
</script>

<Button.Root class={buttonStyle({ className, variant })} {...rest}>{@render children?.()}</Button.Root>
