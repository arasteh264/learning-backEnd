import { SliderRepository } from "../../../domain/repositories/SliderRepository";

export class DeleteSliderUseCase {
  constructor(private repo: SliderRepository) {}
  async execute(id: string) {
    return await this.repo.delete(id);
  }
}