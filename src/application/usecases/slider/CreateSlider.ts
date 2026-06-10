import { SliderRepository } from "../../../domain/repositories/SliderRepository";

export class CreateSliderUseCase {
  constructor(private repo: SliderRepository) {}
  async execute(data: any) {
    return await this.repo.create(data);
  }
}