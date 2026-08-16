import supabase from "../../config/supabase";
import { OtpRepository, OtpCodeRecord } from "../../domain/repositories/OtpRepository";

export class SupabaseOtpRepository implements OtpRepository {
  async create(identifier: string, channel: "sms" | "email", purpose: string, codeHash: string, expiresAt: string) {
    await supabase.from("otp_codes").insert({
      identifier, channel, purpose, code_hash: codeHash, expires_at: expiresAt,
    });
  }

  async findActive(identifier: string, purpose: string): Promise<OtpCodeRecord | null> {
    const { data } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("identifier", identifier)
      .eq("purpose", purpose)
      .eq("consumed", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!data) return null;
    return {
      id: data.id, identifier: data.identifier, channel: data.channel,
      purpose: data.purpose, codeHash: data.code_hash,
      attempts: data.attempts, consumed: data.consumed, expiresAt: data.expires_at,
    };
  }

  async markConsumed(id: string) {
    await supabase.from("otp_codes").update({ consumed: true }).eq("id", id);
  }

  async incrementAttempt(id: string, currentAttempts: number) {
    await supabase.from("otp_codes").update({ attempts: currentAttempts + 1 }).eq("id", id);
  }
}