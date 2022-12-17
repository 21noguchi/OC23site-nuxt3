<template>
  <div class="to-article-button">
    <NuxtLink :to="toArticleLink" class="link">
      <p class="date">{{updateDate}}</p>
      <p class="text">{{articleDetail}}</p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface ArticleInformation {
  toArticleLink: string;
  updateDate: string;
  articleDetail: string;
}
defineProps<ArticleInformation>();
</script>

<style lang="scss" scoped>
.to-article-button {
  background-color: $catch;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 90vw;
  @include tab {
    width: 80vw;
  }
  @include pc {
    width: 70vw;
  }
  height: 90px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);

  &::after {
    background-image: url("assets/images/article-button-arrow.svg");
    background-repeat: no-repeat;
    background-size: contain;
    content: "";
    width: 20px;
    height: 20px;
  }

  .link {
    width: 100%;
    height: 100%;

    text-decoration: none;
    color: $text;

    .date {
      font-size: 12px;
      margin: 5px 10px;
    }
    .text {
      font-size: 16px;
      font-weight: bold;
      margin: 0 10px;
    }
  }
}
</style>