import { model } from 'mongoose';
export default eventHandler(async event => {
  const body = await readBody(event);
  const saveArticle = body as {
    id: string;
    article: SaveArticle;
  };
  const Article = model('articles');
  await Article.findByIdAndUpdate(saveArticle.id, saveArticle.article)
  const articleData = await Article.findOne({_id: saveArticle.id});
  return articleData;
})