import { Component } from '@angular/core';

import {
  NavController,
  NavParams,
  ModalController,
  ItemSliding
} from 'ionic-angular';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TaskModal } from '../../components';

import {
  Task,
  Settings
} from '../../models';

import {
  TaskFactory,
  SettingsService,
  QuoteService
} from '../../providers';

import * as reducers from '../../reducers';
import * as taskActions from '../../actions/task.actions';

@Component({
  selector: 'page-milestones',
  templateUrl: 'milestones.html'
})
export class MilestonesPage {
  resolution: Observable<Task>;
  settings: Settings;
  editMode: boolean = false;
  quote: string = '';

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private taskFactory: TaskFactory,
    private settingsService: SettingsService,
    private quoteService: QuoteService,
    private store: Store<reducers.State>
  ) {
    // this.resolution = this.navParams.get('resolution');
    // this.resolution = { id: -1, name: 'stuff', milestones: [], isComplete: false };
    this.resolution = this.store.select(reducers.getSelectedTask);
    this.settings = this.settingsService.settings;
    this.quote = this.quoteService.getRandomQuote();
  }

  addMilestone(): void {
    let milestoneModal = this.modalCtrl.create(TaskModal, {
      type: 'Milestone'
    });

    milestoneModal.onDidDismiss(milestone => {
      if (milestone) {
        // this.taskFactory.addMilestone(this.resolution, milestone);
        // this.store.dispatch(new taskActions.EditTask())
      }
    });

    milestoneModal.present();
  }

  reorderMilestones(index: any) {
    // this.taskFactory.reorderMilestone(this.resolution, index);
  }

  toggleEditMode(): void {
    // this.editMode =! this.editMode
  }

  edit(milestone: Task, slidingItem: ItemSliding): void {
    let milestoneModal = this.modalCtrl.create(TaskModal, {
      action: 'Edit',
      type: 'Milestone',
      task: milestone
    });

    milestoneModal.onDidDismiss(milestone => {
      if (milestone) {
        // this.taskFactory.update();
      }
    });

    slidingItem.close();
    milestoneModal.present();
  }

  delete(index: number, slidingItem: ItemSliding): void {
    // this.taskFactory.removeMilestone(this.resolution, index).then(() => {
    //   slidingItem.close();
    // });
  }
}
