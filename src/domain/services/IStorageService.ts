export interface IStorageService {
  upload(
    file: Express.Multer.File,
    bucket: string,
    folder: string
  ): Promise<{ url: string }>;

  delete(url: string, bucket: string): Promise<void>;
}