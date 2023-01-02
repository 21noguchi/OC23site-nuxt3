import mongoose from 'mongoose';
export default eventHandler(async () => {
  const Article = mongoose.model('articles');
  const articleData: SaveArticle[] = await Article.find();
  return articleData
})