export interface UserRepository {
  findById(id: string): Promise<any>;
  findAll(): Promise<any[]>;
  delete(id: string): Promise<void>;
  update(id: string, data: any): Promise<any>;
  banToggle(userId: string): Promise<boolean>;
  updatePasswordByIdentifier(identifier: string, passwordHash: string): Promise<void>;
}