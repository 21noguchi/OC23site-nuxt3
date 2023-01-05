import { model } from 'mongoose';
export default eventHandler(async () => {
  const Article = model('articles');
  const articleData: SaveArticle[] = await Article.find();
  return articleData
})