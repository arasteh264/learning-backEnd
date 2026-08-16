import bcrypt from "bcrypt";
import { OtpRepository } from "../../../domain/repositories/OtpRepository";

export class VerifyOtpUseCase {
  constructor(private otpRepository: OtpRepository) {}

  async execute(identifier: string, code: string, purpose: string) {
    const record = await this.otpRepository.findActive(identifier, purpose);
    if (!record) throw new Error("کد نامعتبر است");
    if (new Date(record.expiresAt) < new Date()) throw new Error("کد منقضی شده است");
    if (record.attempts >= 5) throw new Error("تعداد تلاش بیش از حد مجاز است");

    const isValid = await bcrypt.compare(code, record.codeHash);
    if (!isValid) {
      await this.otpRepository.incrementAttempt(record.id, record.attempts);
      throw new Error("کد نامعتبر است");
    }

    await this.otpRepository.markConsumed(record.id);
    return { verified: true, identifier };
  }
}