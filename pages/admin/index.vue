<template>
  <div class="admin">
    <div class="input">
      <div>
        <select v-model="selectedType">
          <option v-for="selectableType in selectableTypes" :value="selectableType.eng">{{ selectableType.ja }}</option>
        </select>
      </div>
      <div>
        <select v-model="selectedTopic">
          <option value="" selected>選択してください</option>
          <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
        </select>
      <input type="text" v-model="selectedTopic"/>
      </div>
      <p>タイトル：<input type="text" v-model="articleTitle" placeholder="タイトルを入力してください" /></p>
      <p>記事</p>
      <textarea v-model="articleBody" cols="30" rows="10" @input="renderArticle"></textarea>
      <button @click="cons">ボタン</button>
    </div>
    <div class="preview">
      <p class="title">{{ articleTitle ? articleTitle : "タイトルを入力してください" }}</p>
      <p class="date">{{ today }}</p>
      <div class="articleBody" v-html="html"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { unified } from 'unified';
  import remarkParse from 'remark-parse';
  import remarkRehype from 'remark-rehype';
  import rehypeStringify from 'rehype-stringify';
  import { Ref } from 'vue';

  import selectableTypes from '~/assets/dictionaries/articleType.json'
  definePageMeta({
    middleware: 'admin'
  });
  const articleTitle: Ref<string> = ref("");
  const articleBody: Ref<string> = ref("");
  const date = new Date();
  const today = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
  const cons = async (): Promise<void> => {
    await $fetch('/api/article/write', {
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
  const selectedTopic: Ref<string> = ref("")
  const { eliminateArticlesByType } = articlesState()
  const selectedArticlesByType = eliminateArticlesByType(selectedType.value)
  const organizeListToTopics = (list: SaveArticle[]): string[] => {
    const topics = [] as string[];
    for (let i = 0; i < list.length; i ++) {
      if (!topics.includes(list[i].topic)) {
        topics.push(list[i].topic);
      }
    }
    return topics
  };
  const topics = organizeListToTopics(selectedArticlesByType);

  const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify);

  const html: Ref<string> = ref("")
  const renderArticle = async () => {
    html.value = await processor.process(articleBody.value).then((contents) => {
      const stringContents = String(contents);
      const atagUpdatedContents = stringContents.replace( '<a ', '<a target="_blank" ' );
      return atagUpdatedContents
    });
    return html
  }
  renderArticle() 
</script>

<style lang="scss">
.admin {
  display: flex;
}

.input {
  width: 30%;
}

.preview {
  width: 70%;
  .title {
    width: 90%;
    font-size: 16px;
    font-weight: bold;
  }
  .date {
    width: 90%;
    margin: 0;
    font-size: 10px;
  }
  .text {
    width: 90%;
  }
}
</style>