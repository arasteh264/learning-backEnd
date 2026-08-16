export interface OtpCodeRecord {
  id: string;
  identifier: string;
  channel: "sms" | "email";
  purpose: "login" | "reset_password";
  codeHash: string;
  attempts: number;
  consumed: boolean;
  expiresAt: string;
}

export interface OtpRepository {
  create(identifier: string, channel: "sms" | "email", purpose: string, codeHash: string, expiresAt: string): Promise<void>;
  findActive(identifier: string, purpose: string): Promise<OtpCodeRecord | null>;
  markConsumed(id: string): Promise<void>;
  incrementAttempt(id: string, currentAttempts: number): Promise<void>;
}