<script lang="ts" module>
  import { Editor } from "@tiptap/core";
  import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
  import Placeholder from "@tiptap/extension-placeholder";
  import StarterKit from "@tiptap/starter-kit";
  import cpp from "highlight.js/lib/languages/cpp";
  import js from "highlight.js/lib/languages/javascript";
  import python from "highlight.js/lib/languages/python";
  import { createLowlight } from "lowlight";
  import { onDestroy, onMount } from "svelte";

  const lowlight = createLowlight();
  lowlight.register("js", js);
  lowlight.register("javascript", js);
  lowlight.register("cpp", cpp);
  lowlight.register("c++", cpp);
  lowlight.register("py", python);
  lowlight.register("python", python);
</script>

<script lang="ts">
  interface Props {
    content?: string;
    editable?: boolean;
    placeholder?: string;
    name?: string;
  }
  let { content = $bindable(), editable = true, placeholder, name }: Props = $props();

  let element: Element;
  let editor = $state.raw<Editor>();

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        CodeBlockLowlight.configure({
          lowlight,
        }),
        Placeholder.configure({
          placeholder,
        }),
      ],
      editorProps: {
        attributes: {
          class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-4 focus:outline-none",
        },
      },
      content,
      editable,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
      onUpdate: ({ editor }) => {
        content = editor.getHTML();
      },
    });
  });
  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div class="rounded-md border border-zinc-300 pt-4 shadow-xs focus-within:ring">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={element}
    spellcheck={false}
    class="min-h-20"
    onclick={(e) => {
      if (e.target === e.currentTarget) {
        editor?.commands.focus("end");
      }
    }}
  ></div>
  {#if name != null}
    <input type="hidden" {name} value={content} />
  {/if}
</div>
