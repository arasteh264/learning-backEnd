import { SliderRepository } from "../../../domain/repositories/SliderRepository";

export class GetAllSlidersUseCase {
  constructor(private repo: SliderRepository) {}
  async execute() {
    return await this.repo.findAll();
  }
}