export class Task {
  public id: string;
  public dueDate: string;
  public name: string = '';
  public description: string = '';
  public milestones: Task[];
  public isComplete: boolean = false;
}
