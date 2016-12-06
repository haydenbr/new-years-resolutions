import { Component } from '@angular/core';

import {
  NavController,
  NavParams,
  ModalController,
  ItemSliding
} from 'ionic-angular';

import { TaskModal } from '../../components';

import {
  Task,
  Settings
} from '../../models';

import {
  TaskFactory,
  SettingsService,
  QuoteService
} from '../../services';

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
        this.taskFactory.addMilestone(this.resolution, milestone);
      }
    });

    milestoneModal.present();
  }

  reorderMilestones(index: any) {
    this.taskFactory.reorderMilestone(this.resolution, index);
  }

  toggleEditMode(): void {
    this.editMode =! this.editMode
  }

  update(): void {
    this.taskFactory.update();
  }

  edit(milestone: Task, slidingItem: ItemSliding): void {
    let milestoneModal = this.modalCtrl.create(TaskModal, {
      action: 'Edit',
      type: 'Milestone',
      task: milestone
    });

    milestoneModal.onDidDismiss(milestone => {
      if (milestone) {
        this.taskFactory.update();
      }
    });

    slidingItem.close();
    milestoneModal.present();
  }

  delete(index: number, slidingItem: ItemSliding): void {
    this.taskFactory.removeMilestone(this.resolution, index).then(() => {
      slidingItem.close();
    });
  }
}
