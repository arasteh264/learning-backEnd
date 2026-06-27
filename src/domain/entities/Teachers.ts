export class Teacher {
  constructor(
    public id: string,
    public userId: string,
    public bio: string,
    public expertise: string[],
    public rating: number,
    public isVerified: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  verify() {
    this.isVerified = true;
  }

  updateBio(bio: string) {
    this.bio = bio;
  }

  updateExpertise(expertise: string[]) {
    this.expertise = expertise;
  }

  canBeDeleted() {
    return true;
  }
}