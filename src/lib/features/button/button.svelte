<script lang="ts" module>
  import { Button } from "bits-ui";
  import { tv, type VariantProps } from "tailwind-variants";

  export const buttonStyle = tv({
    base: "inline-flex items-center justify-center rounded font-semibold focus:ring focus:outline-none active:scale-98 active:transition-all",
    variants: {
      variant: {
        primary: "bg-zinc-900 text-white shadow-xs hover:bg-zinc-900/95 focus:ring-black focus:ring-offset-1",
        secondary: "bg-zinc-200 text-zinc-800 shadow-xs hover:bg-zinc-200/95",
        outline: "border border-zinc-300 bg-transparent text-zinc-800 shadow-xs hover:bg-zinc-100/95",
        ghost: "bg-transparent text-zinc-800 hover:bg-zinc-100/95",
      },
      size: {
        md: "h-8 px-3",
        sm: "h-7 px-3 text-sm",
        xs: "h-6 px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  });
</script>

<script lang="ts">
  type Props = Button.RootProps & VariantProps<typeof buttonStyle> & { class?: string };
  let { children, class: className, variant, ...rest }: Props = $props();
</script>

<Button.Root class={buttonStyle({ className, variant })} {...rest}>{@render children?.()}</Button.Root>
