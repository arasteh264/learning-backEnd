import { uploadFile } from "../../config/uploadSupabase";
import { deleteFile } from "../../config/storageSupabase";
import { IStorageService } from "../../domain/services/IStorageService";

export class SupabaseStorageService implements IStorageService {

  async upload({file, bucket, folder}:any) {
    return uploadFile(file, bucket, folder);
  }

  async delete({url, bucket}:any) {
    return deleteFile(url, bucket);
  }
}