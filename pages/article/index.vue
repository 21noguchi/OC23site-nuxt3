<template>
  <div>
    <ContentList
      v-slot="{ list }"
      path="/article"
    >
      <div v-for="art in list" :key="art.title">
        <NuxtLink :to="art._path">{{art.title}}</NuxtLink>
      </div>
    </ContentList>
  </div>
</template>