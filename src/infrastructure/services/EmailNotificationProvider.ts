const LOGO_BASE64 =
  "PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMjAgMTIwIiBhcmlhLWhpZGRlbj0idHJ1ZSI+PHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjExMiIgaGVpZ2h0PSIxMTIiIHJ4PSIyOCIgZmlsbD0iI0ZGRkZGRiI+PC9yZWN0PjxwYXRoIGQ9Ik00MiAzNCBMNDIgODQgTDYwIDcwIEw3OCA4NCBMNzggMzQgWiIgZmlsbD0iIzMxMkU4MSI+PC9wYXRoPjxjaXJjbGUgY3g9IjgyIiBjeT0iMzgiIHI9IjciIGZpbGw9IiNGQkJGMjQiPjwvY2lyY2xlPjwvc3ZnPg==";

export function otpEmailTemplate(code: string, purpose: string): string {
  const title = purpose === "reset_password" ? "بازیابی رمز عبور" : "کد ورود به حساب کاربری";

  return `
  <!DOCTYPE html>
  <html dir="rtl" lang="fa">
  <body style="margin:0; padding:0; background-color:#f4f4f7; font-family: Tahoma, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">

            <tr>
              <td style="background:#0f172a; padding:24px; text-align:center;">
                <img src="data:image/svg+xml;base64,${LOGO_BASE64}" width="40" height="40" alt="Sabzlearn" style="display:inline-block; vertical-align:middle;" />
                <span style="color:#ffffff; font-size:18px; font-weight:bold; vertical-align:middle; margin-right:8px; font-family: Tahoma, Arial, sans-serif;">Sabzlearn</span>
              </td>
            </tr>

            <tr>
              <td style="padding:32px 32px 8px; text-align:center;">
                <h2 style="margin:0 0 8px; color:#111827; font-size:20px;">${title}</h2>
                <p style="margin:0; color:#6b7280; font-size:14px; line-height:24px;">
                  برای تکمیل این مرحله، کد زیر رو وارد کن. این کد تا ۵ دقیقه معتبره.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px;">
                <div style="background:#f0fdf4; border:1px dashed #22c55e; border-radius:12px; padding:20px; text-align:center;">
                  <span style="font-size:32px; font-weight:bold; letter-spacing:8px; color:#15803d;">${code}</span>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:0 32px 32px; text-align:center;">
                <p style="margin:0; color:#9ca3af; font-size:12px; line-height:20px;">
                  اگه این درخواست رو تو نفرستادی، این ایمیل رو نادیده بگیر.
                </p>
              </td>
            </tr>

            <tr>
              <td style="background:#f9fafb; padding:16px; text-align:center; border-top:1px solid #f0f0f0;">
                <p style="margin:0; color:#9ca3af; font-size:12px;">© Sabzlearn — یاد بگیر، یادداشت کن</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}