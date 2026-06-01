import supabase from "../../config/supabase";
import { uploadFile } from "../../config/uploadSupabase";
import { deleteFile } from "../../config/storageSupabase";
import { Request, Response } from "express";
import { Express } from "express";

export const createCourse = async (req: Request, res: Response) => {
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

    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).json({
        message: "کاور ارسال نشده است",
      });
    }

    const uploaded = await uploadFile(file, "images", "courses");

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
      return res.status(500).json({ message: error.message });
    }

    return res.status(201).json({
      course: data,
      message: "دوره با موفقیت افزوده شد.",
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllCourse = async (req: Request, res: Response) => {
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

export const removeCourse = async (req: Request, res: Response) => {
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

export const getCourseDetail = async (req: Request, res: Response) => {

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


export const updateCourse = async (req: Request, res: Response) => {
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

    // 1. find course FIRST
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

    // 2. build update object
    const updateData: any = {
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

    // 3. handle file update safely
    if (req.file) {
      const file = req.file as Express.Multer.File;

      // delete old file
      if (existingCourse.cover) {
        await deleteFile(existingCourse.cover, "images");
      }

      // upload new file
      const uploaded = await uploadFile(file, "images", "courses");

      updateData.cover = uploaded.url;
    }

    // 4. update DB
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

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};





export const createSession = async (req: Request, res: Response) => {
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

export const getAllSession = async (req: Request, res: Response) => {
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


export const removeSession = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id;

    // 1. find session
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

    // 2. delete video file (only THIS session)
    if (session.video) {
      await deleteFile(session.video, "videos");
    }

    // 3. delete session
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

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};


export const getSessionDetail = async (req: Request, res: Response) => {
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

export const updateSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      title,
      time,
      free,
      course,
    } = req.body;

    // 1. find session first
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

    // 2. safe boolean parsing
    const isFree =
      free === true ||
      free === "1" ||
      free === 1 ||
      free === "true";

    const updateData: any = {
      title,
      time,
      free: isFree,
      course_id: course,
    };

    // 3. handle file replacement safely
    if (req.file) {
      const file = req.file as Express.Multer.File;

      // delete old video first
      if (existingSession.video) {
        await deleteFile(existingSession.video, "videos");
      }

      // upload new video
      const uploaded = await uploadFile(file, "videos", "sessions");

      updateData.video = uploaded.url;
    }

    // 4. update DB
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

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "خطا در ویرایش جلسه",
    });
  }
};