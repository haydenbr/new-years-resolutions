import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TaskFactory, Task } from '../../services';
import { MilestonesPage } from '../milestones/milestones';

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html'
})
export class TasksPage {
  tasks: Task[] = this.taskFactory.tasks;

  constructor(private navCtrl: NavController, private taskFactory: TaskFactory) {}

  addTask() {
    this.tasks.push(new Task('New Task'));
  }

  goToMilestones(task: Task) {
    this.navCtrl.push(MilestonesPage);
  }
}
