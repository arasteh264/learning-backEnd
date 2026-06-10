import { SliderRepository } from "../../../domain/repositories/SliderRepository";

export class UpdateSliderUseCase {
  constructor(private repo: SliderRepository) {}
  async execute(id: string, data: any) {
    return await this.repo.update(id, data);
  }
}