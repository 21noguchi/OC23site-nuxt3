<template>
  <div>
    <NuxtLink to="/admin/article/add">新しい記事を投稿する。</NuxtLink>
    <PagesAdminArticleList />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: 'admin'
  });
</script>