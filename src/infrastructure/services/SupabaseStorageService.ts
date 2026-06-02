import { uploadFile } from "../../config/uploadSupabase";
import { deleteFile } from "../../config/storageSupabase";
import { IStorageService } from "../../domain/services/IStorageService";

export class SupabaseStorageService
  implements IStorageService {

  async upload(
    file: Express.Multer.File,
    bucket: string,
    folder: string
  ) {
    return uploadFile(
      file,
      bucket,
      folder
    );
  }

  async delete(
    url: string,
    bucket: string
  ) {
    return deleteFile(
      url,
      bucket
    );
  }
}