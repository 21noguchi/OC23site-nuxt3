<template>
  <div>
    <NuxtLink to="/admin/article">記事編集ページへ。</NuxtLink>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
});
</script>