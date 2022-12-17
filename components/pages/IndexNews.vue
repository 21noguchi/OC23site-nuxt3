<template>
  <div>
    <p class="news">新着情報</p>
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
.news {
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