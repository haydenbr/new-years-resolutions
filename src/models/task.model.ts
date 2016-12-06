export class Task {
  public isComplete: boolean = false;
  
  constructor(
    public name: string = '', 
    public description?: string, 
    public milestones?: Task[]
  ) {

    if (!this.milestones) {
      this.milestones = [];
    }
  }
}
