import * as uuid from 'uuid';

export class Task {
  public id: string;
  public name: string = '';
  public description: string = '';
  public milestones: Task[] = [];
  public isComplete: boolean = false;

  constructor() {
    this.id = uuid.v4();
  }
}
