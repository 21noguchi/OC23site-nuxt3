<template>
  <div>
    <p>タイトル：<input type="text" v-model="articleTitle"/></p>
    <p>記事</p>
    <textarea v-model="articleBody" cols="30" rows="10"></textarea>
    <button @click="cons">ボタン</button>
  </div>
</template>

<script setup lang="ts">
  import { Ref } from 'vue';
  const articleTitle: Ref<string> = ref("")
  const articleBody: Ref<string> = ref("")
  const cons = async (): Promise<void> => {
    console.log(articleTitle.value)
    console.log(articleBody.value)
    await $fetch('/api/hello', {
      method: "POST",
      body: {
        articleTitle: articleTitle.value,
        articleBody: articleBody.value
      }
    })
  }
</script>