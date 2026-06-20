import axios from "axios";
import { IPaymentGateway } from "../../domain/services/IPaymentGateway";

const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID!;
const IS_SANDBOX = process.env.ZARINPAL_SANDBOX === "true";

const ZARINPAL_REQUEST_URL = IS_SANDBOX
  ? "https://sandbox.zarinpal.com/pg/v4/payment/request.json"
  : "https://api.zarinpal.com/pg/v4/payment/request.json";

const ZARINPAL_VERIFY_URL = IS_SANDBOX
  ? "https://sandbox.zarinpal.com/pg/v4/payment/verify.json"
  : "https://api.zarinpal.com/pg/v4/payment/verify.json";

const ZARINPAL_GATEWAY_URL = IS_SANDBOX
  ? "https://sandbox.zarinpal.com/pg/StartPay/"
  : "https://www.zarinpal.com/pg/StartPay/";

export class ZarinpalGateway implements IPaymentGateway {
  async requestPayment(params: {
    amount: number;
    description: string;
    callbackUrl: string;
  }) {
    try {
      const { data } = await axios.post(ZARINPAL_REQUEST_URL, {
        merchant_id: MERCHANT_ID,
        amount: params.amount * 10,
        description: params.description,
        callback_url: params.callbackUrl,
      });

      console.log("Zarinpal response:", JSON.stringify(data, null, 2));

      if (data.data?.code !== 100) {
        throw new Error("خطا در اتصال به درگاه پرداخت");
      }

      return {
        authority: data.data.authority,
        paymentUrl: `${ZARINPAL_GATEWAY_URL}${data.data.authority}`,
      };
    } catch (err: any) {
      console.log("Zarinpal error response:", JSON.stringify(err.response?.data, null, 2));
      console.log("Zarinpal error status:", err.response?.status);
      throw err;
    }
  }

  async verifyPayment(params: { amount: number; authority: string }) {
    const { data } = await axios.post(ZARINPAL_VERIFY_URL, {
      merchant_id: MERCHANT_ID,
      amount: params.amount * 10,
      authority: params.authority,
    });

    if (data.data?.code === 100 || data.data?.code === 101) {
      return { success: true, refId: String(data.data.ref_id) };
    }

    return { success: false };
  }
}