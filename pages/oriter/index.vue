<template>
  <div>
    <p class="oriter">オリターの方</p>
    <div v-for="topic in topics" :key="topic">
      <p class="title">{{ topic }}</p>
      <div class="articles">
        <UiToArticleButton
          v-for="article in eliminateListByTopic(topic)"
          :toArticleLink="`/oriter/${article.title}`"
          :updateDate="article.date"
          :articleDetail="article.title"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { eliminateArticlesByType } = articlesState();
  const articlesList = eliminateArticlesByType("oriter");
  const organizeListToTopics = (list: SaveArticle[]): string[] => {
    const topics = [] as string[];
    for (let i = 0; i < list.length; i ++) {
      if (!topics.includes(list[i].topic)) {
        topics.push(list[i].topic);
      }
    }
    return topics
  };
  const topics = organizeListToTopics(articlesList);
  const eliminateListByTopic = (topic: string): SaveArticle[] => {
    return articlesList.filter(article => {
      return article.topic === topic
    })
  }
</script>

<style lang="scss" scoped>
.oriter {
  width: fit-content;
  margin: 10px 0 20px 4vw;
  @include tab {
    margin: 10px 0 20px 8vw;
  }
  @include pc {
    margin: 10px 0 20px 12vw;
  }
  font-weight: bold;
  font-size: 20px;
  border-bottom: solid;
  border-color: $main;
  border-width: 5px;
}
.title {
  width: fit-content;
  margin-left: 4vw;
  @include tab {
    margin-left: 8vw;
  }
  @include pc {
    margin-left: 12vw;
  }
  margin-bottom: 0;
  font-weight: bold;
}
.articles {
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>