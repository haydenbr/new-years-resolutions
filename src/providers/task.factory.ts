import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { TaskStore } from './taskstore.service';
import { Task } from '../models';

@Injectable()
export class TaskFactory {
  public tasks: Task[];
  
  constructor(private storage: Storage, private taskStore: TaskStore) {
    this.tasks = this.taskStore.tasks;
  }

  add(task: Task): Promise<any> {
    this.tasks.push(task);
    return this.update();
  }

  addMilestone(task: Task, milestone: Task): Promise<any> {
    task.milestones.push(milestone);
    return this.update();
  }

  remove(index: number): Promise<any> {
    this.tasks.splice(index, 1);
    return this.update();
  }

  removeMilestone(task: Task, index: number): Promise<any> {
    task.milestones.splice(index, 1);
    return this.update();
  }

  reorder(index: any): Promise<any> {
    let task = this.tasks[index.from];

    this.tasks.splice(index.from, 1);
    this.tasks.splice(index.to, 0, task);

    return this.update();
  }

  reorderMilestone(task: Task, index: any): Promise<any> {
    // task.reorderMilestones(index);
    return this.update();
  }

  toggleComplete(task: Task): Promise<any> {
    task.isComplete =! task.isComplete;
    return this.update();
  }

  update(): Promise<any> {
    return this.taskStore.update();
  }
}
