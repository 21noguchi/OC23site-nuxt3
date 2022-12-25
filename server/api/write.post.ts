import { readBody } from 'h3';
import mongoose from 'mongoose';
export default eventHandler(async event => {
  const body = await readBody(event);
  const saveArticle: SaveArticle = {
    type: body.articleType,
    topic: body.articleTopic,
    title: body.articleTitle,
    date: body.articleDate,
    body: body.articleBody
  };
  const Article = mongoose.model('articles');
  const articles = new Article(saveArticle);
  await articles.save();
  const articleData = await Article.find();
  return articleData;
})