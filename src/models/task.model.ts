export class Task {
  public id: number;
  public name: string = '';
  public description?: string;
  public milestones?: Task[];
  public isComplete: boolean = false;
}
