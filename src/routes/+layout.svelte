<script lang="ts">
  import "$lib/features/tiptap/tiptap.css";
  import { Tooltip } from "bits-ui";
  import "../app.css";
  let { children } = $props();
</script>

<Tooltip.Provider>
  {@render children()}
</Tooltip.Provider>
