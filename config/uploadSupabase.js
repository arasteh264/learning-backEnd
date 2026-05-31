const supabase = require("./supabase");

exports.uploadFile = async (file, bucket, folder = "") => {
  const fileName = `${Date.now()}-${file.originalname}`;

  const filePath = folder
    ? `${folder}/${fileName}`
    : fileName;

  const { data, error } = await supabase.storage
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
