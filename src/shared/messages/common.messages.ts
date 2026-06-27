export const CommonMessages = {
  SUCCESS: "عملیات با موفقیت انجام شد",
  CREATED: "با موفقیت ایجاد شد",
  UPDATED: "با موفقیت ویرایش شد",
  DELETED: "با موفقیت حذف شد",

  BAD_REQUEST: "درخواست نامعتبر است",
  UNAUTHORIZED: "احراز هویت انجام نشده است",
  FORBIDDEN: "شما دسترسی لازم را ندارید",
  NOT_FOUND: "اطلاعات مورد نظر پیدا نشد",
  CONFLICT: "داده تکراری است",

  INTERNAL_SERVER_ERROR: "خطای داخلی سرور",
} as const;


export const OrderMessages = {
  CREATED: "سفارش با موفقیت ایجاد شد",
  FETCHED: "لیست سفارش‌ها با موفقیت دریافت شد",
  NOT_FOUND: "سفارش پیدا نشد",
} as const;