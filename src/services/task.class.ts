import * as moment from 'moment';

export class Task {
  public isComplete: boolean = false;
  readonly createdOn: moment.Moment;

  constructor(
    public name: string, 
    public description?: string, 
    public priority?: number, 
    public milestones?: Task[]) {
    this.createdOn = moment();

    if (!this.milestones) {
      this.milestones = [];
    }
  }

  public addMilestone(task: Task) {
    this.milestones.push(task);
  }

  public setMilestones(milestones: Task[]) {
    this.milestones.length = 0;
    this.milestones.push.apply(this.milestones, milestones);
  }
}
