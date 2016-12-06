
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { TaskModal } from '../../components';
import { Task, Settings } from '../../models';

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
  	private modalCtrl: ModalController
  ) {
  	this.resolution = this.navParams.get('resolution');
    this.settings = this.navParams.get('settings');
  }

  addMilestone(): void {
  	let milestoneModal = this.modalCtrl.create(TaskModal, {
  		type: 'Milestone',
      settings: this.settings
  	});

    milestoneModal.onDidDismiss(milestone => {
      if (milestone) {
        this.resolution.milestones.push(milestone);
      }
    });

    milestoneModal.present();
  }
}
