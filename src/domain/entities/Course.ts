export class Course {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public status: string,
    public discount: number,
    public cover: string | null,
    public categoryId: string,
    public creatorId: string
  ) {}
}