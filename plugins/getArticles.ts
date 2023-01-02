export default defineNuxtPlugin(async () => {
  const articles = await $fetch<SaveArticle[]>("/api/article/read");
  const { updateArticles } = articlesState();
  updateArticles(articles);
});