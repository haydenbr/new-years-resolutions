import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Task } from '../models';

@Injectable()
export class TaskFactory {
  public tasks: Task[] = [];
  private key: string = 'tasks';
  
  constructor(private storage: Storage) {
    this.storage.get(this.key).then(tasks => {
      this.tasks.push.apply(this.tasks, tasks);
    });
  }

  add(task: Task): void {
    this.tasks.push(task);
    this.update();
  }

  reorder(index: any): void {
    let task = this.tasks[index.from];

    this.tasks.splice(index.from, 1);
    this.tasks.splice(index.to, 0, task);

    this.update();
  }

  update(): Promise<any> {
    return this.storage.set(this.key, this.tasks);
  }
}
