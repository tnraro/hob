<script lang="ts">
  interface Props {
    id: string;
    displayName?: string | null;
    name: string;
  }
  let { id, displayName, name }: Props = $props();
</script>

<a class="font-bold" href="/users/{id}">{displayName ?? name}</a>
