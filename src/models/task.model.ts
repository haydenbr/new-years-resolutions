

export class Task {
  public id: number;
  public name: string = '';
  public description?: string;
  public milestones?: Task[];
  public isComplete: boolean = false;

  constructor(task?: any) {
    this.name = task && task.name || '';
    this.description = task && task.description;
    this.milestones = task && task.milestones || [];
    this.isComplete = task && task.isComplete;
  }
}
