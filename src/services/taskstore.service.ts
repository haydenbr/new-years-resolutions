import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Task } from '../models';

@Injectable()
export class TaskStore {
	public tasks: Task[] = [];
	private readonly key: string = 'tasks';
	
	constructor(private storage: Storage) {
		this.storage.get(this.key).then(tasks => {
      if (tasks) {
        this.tasks.push.apply(
          this.tasks, 
          tasks.map(task => new Task(task))
        );
      }
    });
	}

	update(): Promise<any> {
    return this.storage.set(this.key, this.tasks);
  }
}
