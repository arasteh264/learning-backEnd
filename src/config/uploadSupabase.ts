import supabase from "./supabase";
import { Express } from "express";

interface UploadResult {
  path: string;
  url: string;
}

export const uploadFile = async (
  file: Express.Multer.File,
  bucket: string,
  folder: string = ""
): Promise<UploadResult> => {
  const fileName = `${Date.now()}-${file.originalname}`;

  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return {
    path: filePath,
    url: publicUrl.publicUrl,
  };
};