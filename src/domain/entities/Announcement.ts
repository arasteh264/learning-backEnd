export class Announcement {
  constructor(
    public id: string,
    public text: string,
    public end_date: string,
    public is_active: boolean,
  ) {}

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  isExpired() {
    return new Date(this.end_date) < new Date();
  }
}