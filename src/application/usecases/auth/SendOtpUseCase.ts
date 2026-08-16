import bcrypt from "bcrypt";
import { OtpRepository } from "../../../domain/repositories/OtpRepository";
import { INotificationProvider } from "../../../domain/services/INotificationProvider";
import { log } from "node:console";

export class SendOtpUseCase {
  constructor(
    private otpRepository: OtpRepository,
    private smsProvider: INotificationProvider,
    private emailProvider: INotificationProvider,
  ) {}

  async execute(
    identifier: string,
    channel: "sms" | "email",
    purpose: "login" | "reset_password",
  ) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", code);
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    await this.otpRepository.create(
      identifier,
      channel,
      purpose,
      codeHash,
      expiresAt,
    );

    const provider = channel === "sms" ? this.smsProvider : this.emailProvider;
    log(`Sending OTP to ${identifier} via ${channel} for purpose: ${purpose}`);
    await provider.send(identifier, code, purpose);

    return { success: true };
  }
}
