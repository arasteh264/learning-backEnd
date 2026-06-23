import { SessionRepository } from "../../../domain/repositories/SessionRepository";
 
export class GetSessionByIdUseCase {
  constructor(private sessionRepo: SessionRepository) {}
 
  async execute(id: string) {
    if (!id) throw new Error("شناسه جلسه الزامی است");
 
    const session = await this.sessionRepo.findById(id);
 
    if (!session) throw new Error("جلسه یافت نشد");
 
    return session;
  }
}