<template>
  <div>
    <p class="oriter">サークル代表者の方</p>
    <p class="title">お知らせ</p>
    <div class="articles">
      <UiToArticleButton 
        toArticleLink="/"
        updateDate="2022.12.17"
        articleDetail="耐えがたきを耐え、忍び難きを忍び、ただ太平を開かんと欲す"
      />
      <UiToArticleButton 
        toArticleLink="/"
        updateDate="2022.12.17"
        articleDetail="耐えがたきを耐え、忍び難きを忍び、ただ太平を開かんと欲す"
      />
      <UiToArticleButton 
        toArticleLink="/"
        updateDate="2022.12.17"
        articleDetail="耐えがたきを耐え、忍び難きを忍び、ただ太平を開かんと欲す"
      />
    </div>
    <p class="title">オリター連絡会議</p>
    <div class="articles">
      <UiToArticleButton 
        toArticleLink="/"
        updateDate="2022.12.17"
        articleDetail="耐えがたきを耐え、忍び難きを忍び、ただ太平を開かんと欲す"
      />
      <UiToArticleButton 
        toArticleLink="/"
        updateDate="2022.12.17"
        articleDetail="耐えがたきを耐え、忍び難きを忍び、ただ太平を開かんと欲す"
      />
      <UiToArticleButton 
        toArticleLink="/"
        updateDate="2022.12.17"
        articleDetail="耐えがたきを耐え、忍び難きを忍び、ただ太平を開かんと欲す"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.oriter {
  width: fit-content;
  margin: 10px 0 20px 4vw;
  font-weight: bold;
  font-size: 20px;
  border-bottom: solid;
  border-color: $main;
  border-width: 5px;
}
.title {
  width: fit-content;
  margin-left: 4vw;
  margin-bottom: 0;
  font-weight: bold;
}
.articles {
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>