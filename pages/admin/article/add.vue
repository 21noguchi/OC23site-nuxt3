<template>
  <div>
    <PagesAdminArticleAdd />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
});
</script>