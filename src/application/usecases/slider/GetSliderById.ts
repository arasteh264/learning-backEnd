import { SliderRepository } from "../../../domain/repositories/SliderRepository";

export class GetSliderByIdUseCase {
  constructor(private repo: SliderRepository) {}
  async execute(id: string) {
    return await this.repo.findById(id);
  }
}