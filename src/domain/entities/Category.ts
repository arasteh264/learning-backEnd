export class Category {
  constructor(
    public id: string,
    public title: string,
    public slug: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}