
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { TaskModal } from '../../components';
import { Task } from '../../services';

@Component({
  selector: 'page-milestones',
  templateUrl: 'milestones.html'
})
export class MilestonesPage {
	task: Task;

  constructor(
  	private navCtrl: NavController, 
  	private navParams: NavParams,
  	private modalCtrl: ModalController
  ) {
  	this.task = this.navParams.get('task');
  }

  addMilestone() {
  	let milestoneModal = this.modalCtrl.create(TaskModal, {
  		type: 'Milestone'
  	});

    milestoneModal.onDidDismiss(milestone => {
      if (milestone) {
        this.task.milestones.push(milestone);
      }
    });

    milestoneModal.present();
  }
}
