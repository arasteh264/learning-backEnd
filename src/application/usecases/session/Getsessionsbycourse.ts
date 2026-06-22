import { SessionRepository } from "../../../domain/repositories/SessionRepository";
 
export class GetSessionsByCourseUseCase {
  constructor(private sessionRepository: SessionRepository) {}
 
  async execute(courseId: string): Promise<any[]> {
    if (!courseId) {
      throw new Error("شناسه دوره الزامی است");
    }
 
    return this.sessionRepository.findByCourseId(courseId);
  }
}
 