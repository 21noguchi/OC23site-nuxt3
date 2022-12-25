<template>
  <div class="committee">
    <UiToCategoryButton
      v-for="category in categorys"
      :key="category.toCategoryName"
      :toCategoryLink="category.toCategoryLink" 
      :toCategoryName="category.toCategoryName" 
    />
  </div>
</template>

<script setup lang="ts">
const categorys = reactive<UserCategory[]>([
  {
    toCategoryLink: "/committee",
    toCategoryName: "当委員会について"
  }
])
</script>

<style lang="scss" scoped>
.committee {
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>