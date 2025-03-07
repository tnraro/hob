<script lang="ts">
  import "$lib/features/tiptap/tiptap.css";
  import "../app.css";
  let { children } = $props();
</script>

{@render children()}
