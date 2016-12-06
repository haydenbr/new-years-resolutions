
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { TaskModal } from '../../components';
import { Task, Settings } from '../../models';
import { TaskFactory, SettingsService, QuoteService } from '../../services';

@Component({
  selector: 'page-milestones',
  templateUrl: 'milestones.html'
})
export class MilestonesPage {
	resolution: Task;
  settings: Settings;
  editMode: boolean = false;
  quote: string = '';

  constructor(
  	private navCtrl: NavController, 
  	private navParams: NavParams,
  	private modalCtrl: ModalController,
    private taskFactory: TaskFactory,
    private settingsService: SettingsService,
    private quoteService: QuoteService
  ) {
  	this.resolution = this.navParams.get('resolution');
    this.settings = this.settingsService.settings;
    this.quote = this.quoteService.getRandomQuote();
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
