const courseModel = require("./../../models/course");
const sessionModel = require("./../../models/session");
const { serialize } = require("../../utils/serialize");
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
      creator,
    });

    const mainCourse = await courseModel
      .findById(course.id)
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
  .populate({
    path: "creator",
    populate: {
      path: "userId",
      select: "name",
    },
  })
  .populate("category", "title")
  .lean();


    const formatted = await Promise.all(
      courses.map(async (course) => {
        const sessionCount = await sessionModel.countDocuments({
          course: course._id,
        });

        return {
          ...serialize(course),
          creator: course.creator?.userId?.name,
          category: course.category?.title,
          cover: `${req.protocol}://${req.get("host")}/course/covers/${course.cover}`,
          sessionCount,
        };
      })
    );

    return res.status(200).json(formatted);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.removeCourse = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "دوره یافت نشد" });
    }

    await sessionModel.deleteMany({ course: course.id });
    await course.deleteOne();

    return res.status(200).json({
      message: "دوره و تمام جلسات با موفقیت حذف شد.",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getCourseDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await courseModel
      .findById(id)
      .populate("creator", "name")
      .populate("category", "title")
      .lean(); 

    if (!course) {
      return res.status(404).json({ message: "دوره یافت نشد" });
    }

    const sessionCount = await sessionModel.countDocuments({
      course: course._id,
    });

    const result = {
      ...course,
      id: course._id,
      creatorId: course.creator?._id,
      categoryId: course.category?._id,
      cover: `${req.protocol}://${req.get("host")}/course/covers/${course.cover}`,
      sessionCount,
    };

    delete result._id;

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
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
;

    const updateData = {
      name,
      description,
      support,
      href,
      price,
      status,
      discount,
      category,
      creator,
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





exports.createSession = async (req, res) => {
  try {
    const { title, time, free } = req.body;
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        message: "ویدیو ارسال نشده است",
      });
    }

    const session = await sessionModel.create({
      title,
      time,
      free,
      video: req.file.filename,
      course: id,
    });

    return res.status(201).json({
      message: "قسمت مورد نظر با موفقیت افزوده شد.",
      session,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "خطای سرور",
    });
  }
};

exports.getAllSession=async(req,res)=>{
  const sessions=await sessionModel.find({}).populate("course","name").lean();
  console.log(sessions);
  
      const formatted = await Promise.all(
      sessions.map(async (item) => {

        return {
          ...serialize(item),
          courseName:item.course.name,
          video: `${req.protocol}://${req.get("host")}/session/videos/${item.video}`,
        };
      })
    );
  return res.status(200).json(formatted)
}

exports.removeSession = async (req, res) => {
  try {
    const session = await sessionModel.findByIdAndDelete(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "جلسه یافت نشد" });
    }

    return res.status(200).json({
      message: "جلسه مورد نظر حذف شد.",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};



exports.getSessionDetail=async (req,res)=>{
  try {
    const { id } = req.params;

    const course = await sessionModel
      .findById(id)
      .populate("creator", "name")
      .populate("category", "title")
      .lean(); 

    if (!course) {
      return res.status(404).json({ message: "جلسه یافت نشد" });
    }

    const sessionCount = await sessionModel.countDocuments({
      course: course._id,
    });

    const result = {
      ...course,
      id: course._id,
      creatorId: course.creator?._id,
      categoryId: course.category?._id,
      cover: `${req.protocol}://${req.get("host")}/course/covers/${course.cover}`,
      sessionCount,
    };

    delete result._id;

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}