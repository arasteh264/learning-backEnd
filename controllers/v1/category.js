const supabase = require("../../config/supabase");
const { uploadFile } = require("../../config/uploadSupabase");
exports.createCategory = async (req, res) => {
  const { href, title } = req.body;

  const { data, error } = await supabase
    .from("categories")
    .insert([{ title, href }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.status(201).json({
    category: data,
    message: "دسته بندی با موفقیت افزوده شد."
  });
};
exports.getAll = async (req, res) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.status(200).json(data);
};
exports.updateCategory = async (req, res) => {
  const { title, href } = req.body;

  const { data, error } = await supabase
    .from("categories")
    .update({ title, href })
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!data) {
    return res.status(404).json({
      message: "کتگوری مورد نظر یافت نشد."
    });
  }

  return res.json({
    message: "کتگوری مورد نظر با موفقیت ویرایش شد.",
    category: data
  });
};
exports.removeCategory = async (req, res) => {
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!data) {
    return res.status(404).json({
      message: "کتگوری مورد نظر یافت نشد."
    });
  }

  return res.status(200).json({
    message: "کتگوری مورد نظر با موفقیت حذف شد."
  });
};