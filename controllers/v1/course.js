const courseModel = require("./../../models/course");
const sessionModel = require("./../../models/session");
exports.createCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      support,
      href,
      price,
      status,
      discount,
      category,
      creator,
    } = req.body;
console.log(req.body);

    const course = await courseModel.create({
      name,
      description,
      support,
      href,
      price,
      status,
      discount,
      category,
      cover: req.file.filename,
      creator: req.user._id,
    });

    const mainCourse = await courseModel
      .findById(course._id)
      .populate("creator", "-password");
    return res
      .status(201)
      .json({ mainCourse, message: "دوره با موفقیت افزوده شد." });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const courses = await courseModel
      .find({})
      .select("name price discount status cover creator category createdAt")
      .populate("creator", "name")
      .populate("category", "title");

    const formattedCourses = await Promise.all(
      courses.map(async (course) => {
        const sessionCount = await sessionModel.countDocuments({
          course: course._id,
        });

        return {
          ...course.toObject(),
          creator: course.creator?.name,
          category: course.category?.title,
          cover: `${req.protocol}://${req.get("host")}/course/covers/${course.cover}`,
          sessionCount,
        };
      })
    );

    res.status(200).json(formattedCourses);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.createSession = async (req, res) => {
  try {
    const { title, time, free} = req.body;
    const {id}=req.params;
    const session = await sessionModel.create({
      title,
      time,
      free,
      video:req.file.filename,
      // video:"تست",
      course:id
    });

return res.status(201).json({message:"قسمت مورد نظر با موفقیت افزوده شد.",session})
  } catch (error) {
        console.log(error);
  }
};


exports.getAllSession=async(req,res)=>{
  const sessions=await sessionModel.find({}).populate("course","name").lean();
  return res.status(200).json(sessions)
}


exports.removeCourse = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "دوره یافت نشد" });
    }

    await sessionModel.deleteMany({ course: course._id });
    await course.deleteOne();

    return res.status(200).json({
      message: "دوره و تمام جلسات با موفقیت حذف شد.",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


exports.getSessionDetail=async (req,res)=>{
  const {id}=req.params;
  const sessionDetail=await sessionModel.findById(id)
  return res.status(200).json(sessionDetail)
}





exports.getCourseDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await courseModel
      .findById(id)
      .populate("creator", "name")
      .populate("category", "title");

    if (!course) {
      return res.status(404).json({
        message: "دوره یافت نشد",
      });
    }
console.log(course);

    const sessionCount = await sessionModel.countDocuments({
      course: course._id,
    });

    const result = {
      ...course.toObject(),
      creatorId: course.creator?._id,
      categoryId: course.category?._id,
      cover: `${req.protocol}://${req.get("host")}/course/covers/${course.cover}`,
      sessionCount,
    };

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};




exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      support,
      href,
      price,
      status,
      discount,
      category,
      creator,
    } = req.body;

    const course = await courseModel.findById(id);

    if (!course) {
      return res.status(404).json({
        message: "دوره یافت نشد",
      });
    }

    const updateData = {
      name,
      description,
      support,
      href,
      price,
      status,
      discount,
      category,
      creator: req.user._id,
    };

    if (req.file) {
      updateData.cover = req.file.filename;
    }

    const updatedCourse = await courseModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    ).populate("creator", "-password");

    return res.status(200).json({
      message: "دوره با موفقیت ویرایش شد",
      course: updatedCourse,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};