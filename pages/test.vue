<template>
  <div>
    <!-- <ContentRenderer :value="test">
      <h1>{{ data.title }}</h1>
      <ContentRendererMarkdown :value="test" />
    </ContentRenderer> -->
    <!-- <template> -->
      <h2 class="fancy-header"><ContentSlot :use="$slots.default" unwrap="p" /></h2>
    <!-- </template> -->
  </div>
</template>

<script setup lang="ts">
const test: string = `
#こんにちは
`
</script>