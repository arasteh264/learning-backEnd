import axios from "axios";
import { INotificationProvider } from "../../domain/services/INotificationProvider";

export class SmsNotificationProvider implements INotificationProvider {
  async send(identifier: string, code: string): Promise<void> {
    await axios.post(
      `https://api.kavenegar.com/v1/${process.env.KAVENEGAR_API_KEY}/verify/lookup.json`,
      null,
      { params: { receptor: identifier, token: code, template: "otp-verify" } }
    );
  }
}