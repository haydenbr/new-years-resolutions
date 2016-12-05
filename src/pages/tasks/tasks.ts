import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { TaskFactory, Task } from '../../services';
import { MilestonesPage } from '../milestones/milestones';
import { TaskModal } from '../../components';

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html'
})
export class TasksPage {
  tasks: Task[] = this.taskFactory.tasks;

  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private taskFactory: TaskFactory
  ) {}

  addTask() {
    let taskModal = this.modalCtrl.create(TaskModal);

    taskModal.onDidDismiss(task => {
      if (task) {
        this.tasks.push(task);
        this.goToMilestones(task);
      }
    });

    taskModal.present();
  }

  goToMilestones(task: Task) {
    this.navCtrl.push(MilestonesPage, {
      task: task
    });
  }
}
