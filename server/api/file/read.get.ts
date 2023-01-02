import mongoose from 'mongoose';
export default eventHandler(async () => {
  const File = mongoose.model('files');
  const fileData: SaveFile[] = await File.find();
  return fileData
})