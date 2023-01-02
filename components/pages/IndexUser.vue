<template>
  <div class="user">
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
    toCategoryLink: "/freshers",
    toCategoryName: "新入生の方"
  },
  {
    toCategoryLink: "/oriter",
    toCategoryName: "オリターの方"
  },{
    toCategoryLink: "/circle",
    toCategoryName: "サークル代表者の方"
  }
])
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>