const categoryModel = require("./../../models/category");
exports.createCategory = async (req, res) => {
  
  const { href, title } = req.body;
  const category = await categoryModel.create({ title, href });
  return res
    .status(201)
    .json({ category, message: "دسته بندی با موفقیت افزوده شد." });
};
exports.getAll = async (req, res) => {
  const category = await categoryModel.find({});
  return res.status(200).json(category);
};
exports.updateCategory = async (req, res) => {
  try {
    const { title, href } = req.body;
    const updateFields = {
      title,
      href,
    };
    const category = await categoryModel
      .findByIdAndUpdate(req.params.id, updateFields, { new: true })
      .lean();
    if (!category) {
      return res.status(404).json({ message: "کتگوری مورد نظر یافت نشد." });
    }

    return res.json({
      message: "کتگوری مورد نظر با موفقیت ویرایش شد.",
      category: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطا,با پشتیبانی تماس بگیرید." });
  }
};
exports.removeCategory = async (req, res) => {
  const categoryRemove = await categoryModel.findByIdAndDelete(req.params.id);
  if (categoryRemove) {
    return res.status(200).json({
      message: "کتگوری مورد نظر با موفقیت حذف شد.",
    });
  }
  return res.status(400).json({
    message: "کتگوری مورد نظر یافت نشد.",
  });
};
