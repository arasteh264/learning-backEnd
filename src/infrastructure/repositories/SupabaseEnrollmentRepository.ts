import supabase from "../../config/supabase";
import { EnrollmentRepository } from "../../domain/repositories/EnrollmentRepository";

export class SupabaseEnrollmentRepository implements EnrollmentRepository {
  async create(data: { userId: string; courseId: string; orderId: string }) {
    // upsert: اگه قبلاً enroll شده، خطا نده (به خاطر unique constraint)
    const { data: result, error } = await supabase
      .from("enrollments")
      .upsert(
        {
          user_id: data.userId,
          course_id: data.courseId,
          order_id: data.orderId,
        },
        { onConflict: "user_id,course_id", ignoreDuplicates: true }
      )
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async findByUser(userId: string) {
    const { data, error } = await supabase
      .from("enrollments")
      .select(`
        *,
        courses:course_id ( id, name, cover, href )
      `)
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  }

  async isEnrolled(userId: string, courseId: string) {
    const { data } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .single();

    return !!data;
  }
}