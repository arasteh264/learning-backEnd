export interface TransactionRepository {
  create(data: {
    orderId: string;
    userId: string;
    amount: number;
    authority: string;
    gateway: string;
  }): Promise<any>;

  findByAuthority(authority: string): Promise<any | null>;
  findAll(): Promise<any[]>;
  markAsSuccess(id: string, refId: string): Promise<any>;
  markAsFailed(id: string): Promise<any>;
}
