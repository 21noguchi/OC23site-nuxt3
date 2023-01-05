import { model } from 'mongoose';
export default eventHandler(async () => {
  const File = model('files');
  const fileData: SaveFile[] = await File.find();
  return fileData
})