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
  const courses = await courseModel.find({});
  return res.status(200).json(courses);
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





exports.getSessionDetail=async (req,res)=>{
  const {id}=req.params;
  const sessionDetail=await sessionModel.findById(id)
  return res.status(200).json(sessionDetail)
}