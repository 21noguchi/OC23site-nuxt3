import type { Ref } from 'vue';

export const articlesState = () => {
  const articles: Ref<SaveArticle[]> = useState('articles', () => []);

  const updateArticles = (articles: Ref<SaveArticle[]>) => (value: SaveArticle[]) => {
    articles.value = value;
  };

  const eliminateArticlesByType = (type: ArticleType): SaveArticle[] => {
    const eliminatedArticles = articles.value.filter(article => {
      return article.type === type
    })
    return eliminatedArticles
  }

  return {
    articles: readonly(articles),
    updateArticles: updateArticles(articles),
    eliminateArticlesByType: eliminateArticlesByType
  };
}