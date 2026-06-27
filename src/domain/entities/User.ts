import { UserRole } from "../../types/user";

export class User {
  constructor(
    public id: string,
    public username: string,
    public name: string,
    public email: string,
    public password: string,
    public phone: string,
    public role: UserRole,
    public banStatus: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  isBanned() {
    return this.banStatus;
  }
}