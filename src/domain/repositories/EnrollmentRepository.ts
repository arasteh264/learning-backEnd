export interface EnrollmentRepository {
  create(data: {
    userId: string;
    courseId: string;
    orderId: string;
  }): Promise<any>;

  findByUser(userId: string): Promise<any[]>;
  isEnrolled(userId: string, courseId: string): Promise<boolean>;
}