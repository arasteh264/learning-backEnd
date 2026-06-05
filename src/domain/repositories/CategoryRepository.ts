export interface CategoryRepository {
  create(data: any): Promise<any>;
  findAll(): Promise<any[]>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
}