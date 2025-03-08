<script lang="ts">
  import AccordionContent from "$lib/features/accordion/accordion-content.svelte";
  import AccordionHeader from "$lib/features/accordion/accordion-header.svelte";
  import AccordionItem from "$lib/features/accordion/accordion-item.svelte";
  import AccordionTrigger from "$lib/features/accordion/accordion-trigger.svelte";
  import Accordion from "$lib/features/accordion/accordion.svelte";

  let { data, children } = $props();

  let tags = $derived(
    [data.problem.difficulty, data.problem.category, ...(data.problem.topics ?? [])].filter((x) => x != null),
  );
</script>

<section class="flex flex-wrap gap-8">
  <div class="min-w-0 flex-1 basis-lg">
    <h1 class="text-2xl font-black">
      <a href="/problems/{data.problem.id}">
        {#if data.problem.no != null}
          {data.problem.no}{". "}
        {/if}
        {data.problem.title}
      </a>
    </h1>
    <div class="text-sm">
      <span class="font-semibold">link:</span>
      <a href={data.problem.url} target="_blank" rel="noreferrer">{data.problem.url}</a>
    </div>
    <div class="text-sm">
      <span class="font-semibold">tags:</span>
      {#each tags as tag}
        <span class="not-last:after:content-[',_']">{tag}</span>
      {/each}
    </div>
    <Accordion type="single">
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger class="px-0">문제 본문</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="overflow-x-auto p-4">
          {@html data.problem.content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
  <div class="flex-1 basis-lg">
    {@render children()}
  </div>
</section>
