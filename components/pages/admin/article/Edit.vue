<template>
  <div class="admin">
    <div class="input">
      <div>
        <p>種別：</p>
        <select v-model="edittingArticle.type" @change="changeType">
          <option v-for="selectableType in articleTypes" :value="selectableType.eng">{{ selectableType.ja }}</option>
        </select>
      </div>
      <div>
        <p>トピック：</p>
        <select v-model="edittingArticle.topic" @change="changeTopic">
          <option value="" selected>選択してください</option>
          <option v-for="topic in topicsOfEliminatedArticlesByType" :key="topic" :value="topic">{{ topic }}</option>
        </select>
        <input type="text" v-model="edittingArticle.topic"/>
      </div>
      <div>
        <p>タイトル：</p>
        <select v-model="edittingArticle.title" @change="changeTitle">
          <option value="" selected>選択してください</option>
          <option v-for="eliminatedArticle in eliminatedArticlesByTypeAndTopic" :key="eliminatedArticle.title" :value="eliminatedArticle.title">{{eliminatedArticle.title }}</option>
        </select>
        <input type="text" v-model="edittingArticle.title" placeholder="タイトルを入力してください" />
      </div>
      <div>
        <p>記事：</p>
        <textarea v-model="edittingArticle.body" cols="30" rows="10" @input="renderArticle"></textarea>
      </div>
      <button @click="send">投稿</button>
    </div>
    <div class="preview">
      <p class="title">{{ edittingArticle.title ? edittingArticle.title : "タイトルを入力してください" }}</p>
      <p class="date">{{ edittingArticle.date ? edittingArticle.date : today }}</p>
      <div class="articleBody" v-html="html"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const runtimeConfig = useRuntimeConfig();
  const { articles } = articlesState()
  const today = getToday()
  const route = useRoute();
  const targetArticle = articles.value.find(article => {
    return article._id === route.query.id
  })
  const edittingArticle = ref<SaveArticle>({
    type: targetArticle?.type ? targetArticle?.type : "freshers",
    topic: targetArticle?.topic ? targetArticle?.topic : "",
    title: targetArticle?.title ? targetArticle.title : "",
    date: targetArticle?.date ? targetArticle.date : today,
    body: targetArticle?.body ? targetArticle.body : ""
  })
  const eliminatedArticlesByType = ref<(SaveArticleId & SaveArticle)[]>([])
  const topicsOfEliminatedArticlesByType = ref<string[]>([])
  const changeType = () => {
    eliminatedArticlesByType.value = articles.value.filter(article => {
      return article.type === edittingArticle.value.type
    })
    topicsOfEliminatedArticlesByType.value = []
    for (let i = 0; i < eliminatedArticlesByType.value.length; i ++) {
      if (!topicsOfEliminatedArticlesByType.value.includes(eliminatedArticlesByType.value[i].topic)) {
        topicsOfEliminatedArticlesByType.value.push(eliminatedArticlesByType.value[i].topic);
      }
    }
    eliminatedArticlesByTypeAndTopic.value = []
  }


  const eliminatedArticlesByTypeAndTopic = ref<(SaveArticleId & SaveArticle)[]>([])
  const changeTopic = () => {
    eliminatedArticlesByTypeAndTopic.value = eliminatedArticlesByType.value.filter(article => {
      return article.topic === edittingArticle.value.topic
    })
  }


  const changeTitle = () => {
    const resultArticle = eliminatedArticlesByTypeAndTopic.value.find(article => {
      return article.title === edittingArticle.value.title
    })
    if (resultArticle !== undefined) {
      edittingArticle.value.body = resultArticle.body
    }
    // edittingArticle.value = resultArticle ? resultArticle : {} as SaveArticle
  }

  const send = async () => {
    if (!edittingArticle.value.topic || !edittingArticle.value.title || !edittingArticle.value.body) {
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
        await $fetch('/api/article/edit', {
          method: "POST",
          body: {
            id: targetArticle?._id,
            article: edittingArticle.value
          },
          baseURL: runtimeConfig.public.nodeEnv.BASE_URL
        });
        alert("投稿が完了しました。")
      }
    }
  };

  const html = ref("")
  const renderArticle = async () => {
    // console.log(edittingArticle.value.body)
    html.value = await fMtH(edittingArticle.value.body)
  } 

  if (targetArticle?.type) {
    changeType()
  }
  if (targetArticle?.topic) {
    changeTopic()
  }
  if (targetArticle?.title) {
    changeTitle()
  }
  if (targetArticle?.body) {
    renderArticle()
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