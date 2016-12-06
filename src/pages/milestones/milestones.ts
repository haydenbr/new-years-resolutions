
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { TaskModal } from '../../components';
import { Task, Settings } from '../../models';
import { SettingsService } from '../../services';

@Component({
  selector: 'page-milestones',
  templateUrl: 'milestones.html'
})
export class MilestonesPage {
	resolution: Task;
  settings: Settings;

  constructor(
  	private navCtrl: NavController, 
  	private navParams: NavParams,
  	private modalCtrl: ModalController,
    private settingsService: SettingsService
  ) {
  	this.resolution = this.navParams.get('resolution');
    // this.settings = this.navParams.get('settings');
    this.settings = this.settingsService.settings;
  }

  addMilestone(): void {
  	let milestoneModal = this.modalCtrl.create(TaskModal, {
  		type: 'Milestone'
  	});

    milestoneModal.onDidDismiss(milestone => {
      if (milestone) {
        this.resolution.milestones.push(milestone);
      }
    });

    milestoneModal.present();
  }
}
