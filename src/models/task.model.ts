

export class Task {
  public id?: number;
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

  getIncompleteMilestones() {
    return this.milestones
      .filter(milestone => !milestone.isComplete)
      .length;
  }

  reorderMilestones(index: any) {
    let milestone = this.milestones[index.from];

    this.milestones.splice(index.from, 1);
    this.milestones.splice(index.to, 0, milestone);
  }
}
