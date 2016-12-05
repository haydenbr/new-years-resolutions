import * as moment from 'moment';

export class Task {
  public isComplete: boolean = false;
  readonly createdOn: moment.Moment;

  constructor(
    public name: string = '', 
    public description?: string, 
    public milestones?: Task[]) {
    this.createdOn = moment();

    if (!this.milestones) {
      this.milestones = [];
    }
  }
}
