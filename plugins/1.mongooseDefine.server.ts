import {set, connect, models, Schema, model} from 'mongoose';
export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  set('strictQuery', true);
  await connect(`mongodb://127.0.0.1:27017/${config.public.localEnv.MONGO_DB_NAME}`);
  console.log("コネクト済み")
  const registeredModels = Object.keys(models)
  if ( !registeredModels.includes("articles") ) {
    const articleSchema = new Schema<SaveArticle>({
      type: {type: String, required: true},
      topic: {type: String, required: true},
      title: {type: String, required: true},
      date: {type: String, required: true},
      body: {type: String, required: true}
    },{
      timestamps: true,
      versionKey: false
    });
    model<SaveArticle>('articles', articleSchema);
  }
  if ( !registeredModels.includes("files") ) {
    const fileSchema = new Schema<SaveFile>({
      name: {type: String, required: true}
    },{
      timestamps: true,
      versionKey: false
    });
    model<SaveFile>('files', fileSchema);
  }
  console.log("スケーマ定義済み")
});