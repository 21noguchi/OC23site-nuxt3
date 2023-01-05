import { model } from 'mongoose';
export default eventHandler(async event => {
  const body = await readBody(event);
  const saveFile: SaveFile = {
    name: body.fileName
  };
  const File = model('files');
  const alreadyCheck = await File.exists({"name": saveFile.name})
  await File.findOneAndUpdate({name: saveFile.name}, {saveFile}, {new:true, upsert: true});
  return {"alreadyCheck": alreadyCheck ? true : false}
})