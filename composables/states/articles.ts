import { Ref } from 'vue';

export const articlesState = () => {
  const articles: Ref<(SaveArticleId & SaveArticle)[]> = useState('articles', () => []);

  const updateArticles = (articles: Ref<(SaveArticleId & SaveArticle)[]>) => (value: (SaveArticleId & SaveArticle)[]) => {
    articles.value = value;
  };

  const eliminateArticlesByType = (type: ArticleType): (SaveArticleId & SaveArticle)[] => {
    const eliminatedArticles = articles.value.filter(article => {
      return article.type === type
    })
    return eliminatedArticles
  }

  const eliminateArticlesToTopicsByType = (type: ArticleType): string[] => {
    const eliminatedArticles = articles.value.filter(article => {
      return article.type === type
    })
    const topics = [] as string[];
    for (let i = 0; i < eliminatedArticles.length; i ++) {
      if (!topics.includes(eliminatedArticles[i].topic)) {
        topics.push(eliminatedArticles[i].topic);
      }
    }
    return topics
  }

  return {
    articles: readonly(articles),
    updateArticles: updateArticles(articles),
    eliminateArticlesByType: eliminateArticlesByType,
    eliminateArticlesToTopicsByType: eliminateArticlesToTopicsByType
  };
}