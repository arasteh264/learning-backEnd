export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
}
export type UserRole = "ADMIN" | "USER" | "TEACHER";