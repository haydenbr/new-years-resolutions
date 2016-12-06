
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { TaskModal } from '../../components';
import { Task, Settings } from '../../models';
import { TaskFactory, SettingsService } from '../../services';

@Component({
  selector: 'page-milestones',
  templateUrl: 'milestones.html'
})
export class MilestonesPage {
	resolution: Task;
  settings: Settings;
  editMode: boolean = false;

  constructor(
  	private navCtrl: NavController, 
  	private navParams: NavParams,
  	private modalCtrl: ModalController,
    private taskFactory: TaskFactory,
    private settingsService: SettingsService
  ) {
  	this.resolution = this.navParams.get('resolution');
    this.settings = this.settingsService.settings;
  }

  addMilestone(): void {
  	let milestoneModal = this.modalCtrl.create(TaskModal, {
  		type: 'Milestone'
  	});

    milestoneModal.onDidDismiss(milestone => {
      if (milestone) {
        this.resolution.milestones.push(milestone);
        this.updateTask();
      }
    });

    milestoneModal.present();
  }

  reorderMilestones(index: any) {
    this.resolution.reorderMilestones(index);
    this.taskFactory.update();
  }

  toggleEditMode(): void {
    this.editMode =! this.editMode
  }

  private updateTask() {
    this.taskFactory.update();
  }
}
