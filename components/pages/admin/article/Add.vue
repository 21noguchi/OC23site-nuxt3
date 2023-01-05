<template>
  <div class="admin">
    <div class="input">
      <div>
        <p>種別：</p>
        <select v-model="addingArticle.type" @change="changeType">
          <option v-for="selectableType in articleTypes" :value="selectableType.eng">{{ selectableType.ja }}</option>
        </select>
      </div>
      <div>
        <p>トピック：</p>
        <select v-model="addingArticle.topic">
          <option value="" selected>選択してください</option>
          <option v-for="topic in topicsOfEliminatedArticlesByType" :key="topic" :value="topic">{{ topic }}</option>
        </select>
        <input type="text" v-model="addingArticle.topic"/>
      </div>
      <div>
        <p>タイトル：</p>
        <input type="text" v-model="addingArticle.title" placeholder="タイトルを入力してください" />
      </div>
      <div>
        <p>記事：</p>
        <textarea v-model="addingArticle.body" cols="30" rows="10" @input="renderArticle"></textarea>
      </div>
      <button @click="send">投稿</button>
    </div>
    <div class="preview">
      <p class="title">{{ addingArticle.title ? addingArticle.title : "タイトルを入力してください" }}</p>
      <p class="date">{{ today }}</p>
      <div class="articleBody" v-html="html"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const runtimeConfig = useRuntimeConfig();
  const { articles } = articlesState()
  const today = getToday()
  const addingArticle = ref<SaveArticle>({
    type: "freshers",
    topic: "",
    title: "",
    date: today,
    body: ""
  })

  const eliminatedArticlesByType = ref<SaveArticle[]>([])
  const topicsOfEliminatedArticlesByType = ref<string[]>([])
  const changeType = () => {
    eliminatedArticlesByType.value = articles.value.filter(article => {
      return article.type === addingArticle.value.type
    })
    topicsOfEliminatedArticlesByType.value = []
    for (let i = 0; i < eliminatedArticlesByType.value.length; i ++) {
      if (!topicsOfEliminatedArticlesByType.value.includes(eliminatedArticlesByType.value[i].topic)) {
        topicsOfEliminatedArticlesByType.value.push(eliminatedArticlesByType.value[i].topic);
      }
    }
  }
  changeType() //最初の一回用

  const send = async () => {
    if (!addingArticle.value.topic || !addingArticle.value.title || !addingArticle.value.body) {
      alert("記事の情報が不十分です。")
    }
    else {
      const pass = prompt("投稿用のパスワードを入力してください。")
      const verify = await $fetch('/api/verify/pass', {
        method: "POST",
        body: {
          pass: pass
        },
        baseURL: runtimeConfig.public.nodeEnv.BASE_URL
      });
      if (verify) {
        await $fetch('/api/article/write', {
          method: "POST",
          body: addingArticle.value,
          baseURL: runtimeConfig.public.nodeEnv.BASE_URL
        });
        alert("投稿が完了しました。")
      }
    }
  };

  const html = ref("")
  const renderArticle = async () => {
    html.value = await fMtH(addingArticle.value.body)
  } 
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