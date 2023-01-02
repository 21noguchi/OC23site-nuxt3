import mongoose from 'mongoose';
export default defineNuxtPlugin(async () => {
  mongoose.set('strictQuery', true);
  const mongooseConnect = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/OC23site');
  }
  mongooseConnect()
  console.log("コネクト済み")
  const registeredModels = Object.keys(mongoose.models)
  if ( !registeredModels.includes("articles") ) {
    const articleSchema = new mongoose.Schema<SaveArticle>({
      type: {type: String, required: true},
      topic: {type: String, required: true},
      title: {type: String, required: true},
      date: {type: String, required: true},
      body: {type: String, required: true}
    },{
      timestamps: true,
      versionKey: false
    });
    mongoose.model<SaveArticle>('articles', articleSchema);
  }
  if ( !registeredModels.includes("files") ) {
    const fileSchema = new mongoose.Schema<SaveFile>({
      name: {type: String, required: true}
    },{
      timestamps: true,
      versionKey: false
    });
    mongoose.model<SaveFile>('files', fileSchema);
  }
  console.log("スケーマ定義済み")
});