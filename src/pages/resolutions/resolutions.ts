import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { TaskFactory, SettingsService } from '../../services';
import { Task, Settings } from '../../models';
import { TaskModal } from '../../components';
import { MilestonesPage } from '../milestones/milestones';

@Component({
  selector: 'page-resolutions',
  templateUrl: 'resolutions.html'
})
export class ResolutionsPage {
  resolutions: Task[] = this.taskFactory.tasks;
  editMode: boolean = false;
  settings: Settings;

  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private taskFactory: TaskFactory,
    private settingsService: SettingsService
  ) {
    this.settings = this.settingsService.settings;
  }

  addResolution(): void {
    let taskModal = this.modalCtrl.create(TaskModal, {
      settings: this.settings
    });

    taskModal.onDidDismiss(task => {
      if (task) {
        task.priority = this.resolutions.length;

        this.taskFactory.add(task);
        this.goToMilestones(task);
      }
    });

    taskModal.present();
  }

  goToMilestones(resolution: Task): void {
    this.navCtrl.push(MilestonesPage, {
      resolution: resolution
    });
  }

  toggleEditMode(): void {
    this.editMode =! this.editMode
  }

  reorderResolutions(index: any): void {
    this.taskFactory.reorder(index);
  }
}
