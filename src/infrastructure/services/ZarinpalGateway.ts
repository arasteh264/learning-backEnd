import axios from "axios";
import { IPaymentGateway } from "../../domain/services/IPaymentGateway";

const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID!;
const ZARINPAL_REQUEST_URL =
  "https://api.zarinpal.com/pg/v4/payment/request.json";
const ZARINPAL_VERIFY_URL =
  "https://api.zarinpal.com/pg/v4/payment/verify.json";
const ZARINPAL_GATEWAY_URL = "https://www.zarinpal.com/pg/StartPay/";

export class ZarinpalGateway implements IPaymentGateway {
  async requestPayment(params: {
    amount: number;
    description: string;
    callbackUrl: string;
  }) {
    const { data } = await axios.post(ZARINPAL_REQUEST_URL, {
      merchant_id: MERCHANT_ID,
      amount: params.amount * 10, //change to rials
      description: params.description,
      callback_url: params.callbackUrl,
    });

    if (data.data?.code !== 100) {
      throw new Error("خطا در اتصال به درگاه پرداخت");
    }

    return {
      authority: data.data.authority,
      paymentUrl: `${ZARINPAL_GATEWAY_URL}${data.data.authority}`,
    };
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