export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig();
  const articles = await $fetch<SaveArticle[]>("/api/article/read", {
    baseURL: runtimeConfig.public.nodeEnv.BASE_URL
  });
  const { updateArticles } = articlesState();
  updateArticles(articles);
});