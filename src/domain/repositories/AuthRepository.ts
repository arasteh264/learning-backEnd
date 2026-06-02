export interface AuthRepository {
  findByEmailOrUsername(identifier: string): Promise<any>;
  findByPhone(phone: string): Promise<any>;
  count(): Promise<number>;
  create(data: any): Promise<any>;
}