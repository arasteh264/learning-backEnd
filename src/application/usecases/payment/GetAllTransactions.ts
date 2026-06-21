import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";

export class GetAllTransactionsUseCase {
  constructor(private transactionRepo: TransactionRepository) {}

  async execute() {
    return await this.transactionRepo.findAll();
  }
}