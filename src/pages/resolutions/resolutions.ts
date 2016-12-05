import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { TaskFactory, Task } from '../../services';
import { MilestonesPage } from '../milestones/milestones';
import { TaskModal } from '../../components';

@Component({
  selector: 'page-resolutions',
  templateUrl: 'resolutions.html'
})
export class ResolutionsPage {
  resolutions: Task[] = this.taskFactory.tasks;
  editMode: boolean = false;

  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private taskFactory: TaskFactory
  ) {}

  addResolution() {
    let taskModal = this.modalCtrl.create(TaskModal);

    taskModal.onDidDismiss(task => {
      if (task) {
        task.priority = this.resolutions.length;

        this.resolutions.push(task);
        this.goToMilestones(task);
      }
    });

    taskModal.present();
  }

  goToMilestones(resolution: Task) {
    this.navCtrl.push(MilestonesPage, {
      resolution: resolution
    });
  }

  toggleEditMode() {
    this.editMode =! this.editMode
  }

  reorderResolutions(index) {
    let task = this.resolutions[index.from];

    this.resolutions.splice(index.from, 1);
    this.resolutions.splice(index.to, 0, task);
  }
}
