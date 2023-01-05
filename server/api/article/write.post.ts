import { model } from 'mongoose';
export default eventHandler(async event => {
  const body = await readBody(event);
  const saveArticle = body as SaveArticle;
  const Article = model('articles');
  const articles = new Article(saveArticle);
  await articles.save();
  const articleData = await Article.find();
  return articleData;
})