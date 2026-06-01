export class DeleteCourse {
  constructor(
    private courseRepo: any,
    private sessionRepo: any,
    private storageService: any
  ) {}

  async execute(courseId: string) {
    const course = await this.courseRepo.findById(courseId);

    if (!course) throw new Error("Course not found");

    await this.sessionRepo.deleteByCourseId(courseId);

    if (course.cover) {
      await this.storageService.deleteFile(course.cover, "images");
    }

    await this.courseRepo.delete(courseId);
  }
}