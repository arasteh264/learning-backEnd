import { User } from "../types/user";
import { File } from "multer";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      file?: File;
      files?: File[];
    }
  }
}

export {};