import mongoose from 'mongoose';
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const File = mongoose.model('files');
  const fileData: SaveFile | null = await File.findOne({"name": body.fileName});
  return fileData
})