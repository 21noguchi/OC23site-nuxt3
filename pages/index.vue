<template>
  <div>
    <PagesIndexUser />
    <PagesIndexNews />
  </div>
</template>

<script setup lang="ts">
console.log(await $fetch('/api/hello'))
</script>