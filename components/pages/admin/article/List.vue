<template>
  <div class="list">
    <div v-for="articleType in articleTypes" :key="articleType.eng" class="type">
      <h1>{{ articleType.ja }}</h1>
      <div v-for="topicOfEliminatedArticlesByType in topicsOfEliminatedArticlesByType(articleType.eng)" :key="topicOfEliminatedArticlesByType">
        <h2>{{ topicOfEliminatedArticlesByType }}</h2>
        <p><NuxtLink v-for="eliminatedArticleByTypeAndTopic in eliminatedArticlesByTypeAndTopic(articleType.eng, topicOfEliminatedArticlesByType)" :key="eliminatedArticleByTypeAndTopic.title" :to="`/admin/article/edit?id=${eliminatedArticleByTypeAndTopic._id}`">{{ eliminatedArticleByTypeAndTopic.title }}</NuxtLink></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { articles } = articlesState()
const eliminatedArticlesByType = (articleType: string) => {
  return articles.value.filter(article => {
    return article.type === articleType
  })
}
const topicsOfEliminatedArticlesByType = (articleType: string) => {
  const resultArray = ref<string[]>([])
  for (let i = 0; i < eliminatedArticlesByType(articleType).length; i ++) {
    if (!resultArray.value.includes(eliminatedArticlesByType(articleType)[i].topic)) {
      resultArray.value.push(eliminatedArticlesByType(articleType)[i].topic);
    }
  }
  return resultArray.value
}
const eliminatedArticlesByTypeAndTopic = (articleType: string, articleTopic: string) => {
  return eliminatedArticlesByType(articleType).filter(article => {
    return article.topic === articleTopic
  })
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
}
.type {
  width: 20%;
}
</style>