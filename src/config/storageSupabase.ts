import supabase from "./supabase";

export const deleteFile = async (url: string, bucket: string): Promise<void> => {
  if (!url) return;

  const path = url.split(`${bucket}/`)[1];

  if (!path) return;

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    throw new Error(error.message);
  }
};