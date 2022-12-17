<template>
  <div class="to-category-button">
    <NuxtLink :to="toCategoryLink" class="link">
      <p class="text">{{toCategoryName}}</p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface UserCategory {
  toCategoryLink: string;
  toCategoryName: string;
}
defineProps<UserCategory>();
</script>

<style lang="scss" scoped>
.to-category-button {
  background-color: $main;

  display: flex;
  align-items: center;

  width: 90vw;
  @include tab {
    width: 80vw;
  }
  @include pc {
    width: 70vw;
  }
  height: 60px;
  margin: 10px;
  border-radius: 5px;

  &::after {
    background-image: url("assets/images/category-button-arrow.svg");
    background-repeat: no-repeat;
    background-size: contain;
    content: "";
    width: 20px;
    height: 20px;
  }

  .link {
    width: 100%;
    height: 60px;

    text-decoration: none;
    color: $catch;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
      margin-left: 20px;
    }
  }
}
</style>