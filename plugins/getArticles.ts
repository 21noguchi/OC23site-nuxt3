export default defineNuxtPlugin(async () => {
  const articles = await $fetch<SaveArticle[]>("/api/read");
  const { updateArticles } = articlesState();
  updateArticles(articles);
});