const supabase = require("../../config/supabase");
const { uploadFile } = require("../../config/uploadSupabase");
const { deleteFile } = require("../../config/storageSupabase");
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

   if (!req.file) {
      return res.status(400).json({
        message: "کاور ارسال نشده است",
      });
    }
        const uploaded = await uploadFile(
      req.file,
      "images",
      "courses"
    );
    const { data, error } = await supabase
      .from("courses")
      .insert([
        {
          name,
          description,
          support,
          href,
          price,
          status,
          discount,
          category_id: category,
          creator_id: creator,
          cover: uploaded.url,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    return res.status(201).json({
      course: data,
      message: "دوره با موفقیت افزوده شد.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const { data: courses, error } = await supabase
      .from("courses")
      .select(`
        *,
        teachers:creator_id (
          id,
          bio,
          rating,
          user_id
        ),
        categories:category_id (
          id,
          title
        )
      `);

    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }


const formatted = await Promise.all(
  courses.map(async (course) => {
    const { count } = await supabase
      .from("sessions")
      .select("*", { count: "exact", head: true })
      .eq("course_id", course.id);

    return {
      id: course.id,
      name: course.name,
      description: course.description,
      price: course.price,
      status: course.status,
      discount: course.discount,

      creator: course.teachers?.user_id,
      category: course.categories?.title,

      cover: course.cover
  ? course.cover
  : null,

      sessionCount: count || 0,
    };
  })
);

    return res.status(200).json(formatted);
  } catch (err) {
    return res.status(500).json({ message: "خطای سیستمی با پشتیبانی تماس بگیرید." });
  }
};

exports.removeCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // 1. check existence first
    const { data: existingCourse, error: findError } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .single();

    if (findError || !existingCourse) {
      return res.status(404).json({ message: "دوره یافت نشد" });
    }

    // 2. delete sessions first (optional but correct design)
    await supabase
      .from("sessions")
      .delete()
      .eq("course_id", courseId);

    // 3. delete course
    const { error: deleteError } = await supabase
      .from("courses")
      .delete()
      .eq("id", courseId);

      if (existingCourse.cover) {
  await deleteFile(existingCourse.cover, "images");
}

    if (deleteError) {
      return res.status(500).json({ message: deleteError.message });
    }

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

    const { data: course, error } = await supabase
      .from("courses")
      .select(`
        *,
        categories (
          id,
          title
        ),
        teachers (
          id,
          bio,
          user_id,
          users (
            id,
            name
          )
        )
      `)
      .eq("id", id)
      .single();

    if (error || !course) {
      return res.status(404).json({
        message: "دوره یافت نشد",
      });
    }
    const { count } = await supabase
      .from("sessions")
      .select("*", { count: "exact", head: true })
      .eq("course_id", id);

    const result = {
      id: course.id,
      name: course.name,
      description: course.description,
      support: course.support,
      href: course.href,
      price: course.price,
      status: course.status,
      discount: course.discount,

      category: course.categories?.title,

      creator: course.teachers?.users?.name,

      cover: course.cover
  ? course.cover
  : null,

      sessionCount: count || 0,
    };

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

if (req.file) {

  await deleteFile(existingCourse.cover, "images");
  const uploaded = await uploadFile(
    req.file,
    "images",
    "courses"
  );

  updateData.cover = uploaded.url;
}
const { data: existingCourse, error: findError } = await supabase
  .from("courses")
  .select("*")
  .eq("id", id)
  .single();

if (findError || !existingCourse) {
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
  category_id: category,
  creator_id: creator,
};

if (req.file) {
  if (existingCourse.cover) {
    await deleteFile(existingCourse.cover, "images");
  }

  const uploaded = await uploadFile(
    req.file,
    "images",
    "courses"
  );

  updateData.cover = uploaded.url;
}




   const { data: updatedCourse, error } = await supabase
      .from("courses")
      .update(updateData)
      .eq("id", id)
      .select(`
        *,
        categories (
          id,
          title
        ),
        teachers (
          id,
          bio,
          users (
            name
          )
        )
      `)
      .single();

    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

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
const uploaded = await uploadFile(
  req.file,
  "videos",
  "sessions"
);

    const { data, error } = await supabase
      .from("sessions")
      .insert([
        {
          title,
          time,
          free: free === "1" || free === 1,
          video: uploaded.url,
          course_id: id,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    return res.status(201).json({
      message: "قسمت مورد نظر با موفقیت افزوده شد.",
      session: data,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "خطای سرور",
    });
  }
};

exports.getAllSession = async (req, res) => {
  try {
    const { data: sessions, error } = await supabase
      .from("sessions")
      .select(`
        *,
        courses (
          id,
          name
        )
      `);

    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  

    const formatted = sessions.map((item) => {
      return {
        id: item.id,
        title: item.title,
        time: item.time,
        free: item.free,

        courseName: item.courses?.name,

        video: item.video
      };
    });
  
    return res.status(200).json(formatted);

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};


exports.removeSession = async (req, res) => {
  try {
    const sessionId = req.params.id;

    // 1. check existence
    const { data: session, error: findError } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (findError || !session) {
      return res.status(404).json({
        message: "جلسه یافت نشد",
      });
    }
const { data: sessions } = await supabase
  .from("sessions")
  .select("video")
  .eq("course_id", courseId);

for (const s of sessions || []) {
  if (s.video) {
    await deleteFile(s.video, "videos");
  }
}
    const { error: deleteError } = await supabase
      .from("sessions")
      .delete()
      .eq("id", sessionId);

    if (deleteError) {
      return res.status(500).json({
        message: deleteError.message,
      });
    }
    return res.status(200).json({
      message: "جلسه مورد نظر حذف شد.",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};


exports.getSessionDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: session, error } = await supabase
      .from("sessions")
      .select(`
        *,
        courses (
          id,
          name
        )
      `)
      .eq("id", id)
      .single();

    if (error || !session) {
      return res.status(404).json({
        message: "جلسه یافت نشد",
      });
    }

    const result = {
      id: session.id,
      title: session.title,
      time: session.time,
      free: session.free,

      course: session.courses?.id,

      video: session.video
    };

    return res.status(200).json(result);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "خطای سرور",
    });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      time,
      free,
      course,
    } = req.body;

    const { data: existingSession, error: findError } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", id)
      .single();

    if (findError || !existingSession) {
      return res.status(404).json({
        message: "جلسه یافت نشد",
      });
    }

    const updateData = {
      title,
      time,
      free: free === "1" || free === true,
      course_id: course,
    };

  if (req.file) {
  const uploaded = await uploadFile(
    req.file,
    "videos",
    "sessions"
  );

  updateData.video = uploaded.url;
}

    const { data: updatedSession, error } = await supabase
      .from("sessions")
      .update(updateData)
      .eq("id", id)
      .select(`
        *,
        courses (
          id,
          name
        )
      `)
      .single();

       if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    return res.status(200).json({
      message: "جلسه با موفقیت ویرایش شد",
      session: updatedSession,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "خطا در ویرایش جلسه",
    });
  }
};