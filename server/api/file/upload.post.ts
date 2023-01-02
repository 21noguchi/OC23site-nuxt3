import multer from 'multer';
import { IncomingMessage, ServerResponse } from 'node:http';
declare type NodeMiddleware = (req: IncomingMessage, res: ServerResponse, next: (err?: Error) => any) => any;

const storage = multer.diskStorage({  // ...①
  // ファイルの保存先を指定
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  // ファイル名を指定(オリジナルのファイル名を保持)
  filename: function (req, file, cb) {
    // console.log(file);
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage
});

export default defineEventHandler(async (event) => {
  try {
    const nodeListner = upload.single('uploadedFile') as NodeMiddleware;
    await callNodeListener(nodeListner , event.node.req, event.node.res);
    return { success: true };
  } catch (e) {
    console.log(e);
    return e;
  };
});