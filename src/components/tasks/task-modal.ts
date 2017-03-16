import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Task } from '../../models';

@Component({
  templateUrl: 'task-modal.html'
})
export class TaskModal {
  task: Task;
  type: String = 'Resolution';
  action: String = 'Add';
  settings = { darkMode: false }

  constructor(
    private viewCtrl: ViewController, 
    private navParams: NavParams,
  ) {
    if (this.navParams.get('type')) {
      this.type = this.navParams.get('type');
    }

    if (this.navParams.get('action')) {
      this.action = this.navParams.get('action');
    }

    this.task = this.navParams.get('task') ? this.navParams.get('task') : new Task();
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  submit(taskName, taskDescription): void {
    this.viewCtrl.dismiss(Object.assign(this.task, { name: taskName.value, description: taskDescription.value }));
  }
}
