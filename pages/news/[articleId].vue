<template>
  <div class="article">
    <p class="title">{{ showArticle?.title }}</p>
    <p class="date">{{ showArticle?.date }}</p>
    <div class="articleBody" v-html="html"></div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const { eliminateArticlesByType } = articlesState();

  const articleTitle = route.params.articleId;
  const articlesList = eliminateArticlesByType("news");
  const showArticle = articlesList.find(article => {
    return article.title === articleTitle;
  });

  const html = await fMtH(showArticle?.body ? showArticle?.body : "");
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.title {
  width: 90vw;
  font-size: 16px;
  font-weight: bold;
}
.date {
  width: 90vw;
  margin: 0;
  font-size: 10px;
}
.text {
  width: 90vw;
}
</style>