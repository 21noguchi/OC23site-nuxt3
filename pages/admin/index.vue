<template>
  <div>
    <select v-model="selectedType">
      <option value="freshers">新入生の方</option>
      <option value="oriter">オリターの方</option>
      <option value="circle">サークル代表者の方</option>
      <option value="news">新着情報</option>
      <option value="committee">当委員会について</option>
    </select>
    <select v-model="selectedTopic">
      <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
    </select>
    <p>タイトル：<input type="text" v-model="articleTitle"/></p>
    <p>記事</p>
    <textarea v-model="articleBody" cols="30" rows="10"></textarea>
    <button @click="cons">ボタン</button>
  </div>
</template>

<script setup lang="ts">
  import { Ref } from 'vue';
  const articleTitle: Ref<string> = ref("");
  const articleBody: Ref<string> = ref("");
  const date = new Date();
  const today = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
  const cons = async (): Promise<void> => {
    await $fetch('/api/write', {
      method: "POST",
      body: {
        articleType: selectedType.value,
        articleTopic: selectedTopic.value,
        articleTitle: articleTitle.value,
        articleDate: today,
        articleBody: articleBody.value
      }
    });
  };
  const selectedType: Ref<ArticleType> = ref("freshers")
  const selectedTopic: Ref<string> = ref("ははは")
  const topics = ["ははは", "ひひひ"]
</script>