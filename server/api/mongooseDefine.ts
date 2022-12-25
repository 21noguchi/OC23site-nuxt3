import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
const mongooseConnect = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/mongoosetest');
}
mongooseConnect()
console.log("コネクト済み")
const articleSchema = new mongoose.Schema<SaveArticle>({
  type: {type: String, required: true},
  topic: {type: String, required: true},
  title: {type: String, required: true},
  date: {type: String, required: true},
  body: {type: String, required: true}
});
mongoose.model<SaveArticle>('articles', articleSchema);
console.log("スケーマ定義済み")
