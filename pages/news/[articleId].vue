<template>
  <div class="article">
    <p class="title">{{ showArticle?.title }}</p>
    <p class="date">{{ showArticle?.date }}</p>
    <div class="text" v-html="html"></div>
  </div>
</template>

<script setup lang="ts">
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import type { Ref } from 'vue';

const route = useRoute();
const articleTitle = route.params.articleId
const { eliminateArticlesByType } = articlesState();
const articlesList = eliminateArticlesByType("news");
const showArticle = articlesList.find(article => {
  return article.title === articleTitle
})

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify);

const html: Ref<string> = ref("")
const renderArticle = async () => {
  if (showArticle) {
    html.value = await processor.process(showArticle.body).then((contents) => {
      const stringContents = String(contents);
      const atagUpdatedContents = stringContents.replace( '<a ', '<a target="_blank" ' );
      return atagUpdatedContents
    });
    return html
  }
}
renderArticle() 
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