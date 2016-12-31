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
  SettingsService
} from '../../providers';

import * as reducers from '../../reducers';
import * as milestoneActions from '../../actions/milestone.actions';
import * as settingsActions from '../../actions/settings.actions';

@Component({
  selector: 'page-milestones',
  templateUrl: 'milestones.html'
})
export class MilestonesPage {
  resolution: Observable<Task>;
  settings: Observable<Settings>;
  editMode: boolean = false;
  taskId: string = '';

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private settingsService: SettingsService,
    private store: Store<reducers.State>
  ) {
    this.resolution = this.store.select(reducers.getSelectedTask);
    this.settings = this.store.select(reducers.getSettingsState);
    this.taskId = this.navParams.get('taskId');
  }

  addMilestone(): void {
    let milestoneModal = this.modalCtrl.create(TaskModal, {
      type: 'Milestone'
    });

    milestoneModal.onDidDismiss((milestone) => {
      if (milestone) {
        console.log('milestone', milestone);
        this.store.dispatch(new milestoneActions.AddMilestone({ taskId: this.taskId, milestone }));
      }
    });

    milestoneModal.present();
  }

  onReorder(index: { from: number, to: number }) {
    this.store.dispatch(new milestoneActions.ReorderMilestone({ taskId: this.taskId, index }));
  }

  onToggleReorderMode(): void {
    this.store.dispatch(new settingsActions.ToggleReorderMode());
  }

  edit(milestone: Task, slidingItem: ItemSliding): void {
    let milestoneModal = this.modalCtrl.create(TaskModal, {
      action: 'Edit',
      type: 'Milestone',
      task: milestone
    });

    milestoneModal.onDidDismiss(milestone => {
      if (milestone) {
        
      }
    });

    slidingItem.close();
    milestoneModal.present();
  }

  onEdit(milestone: Task) {
    let milestoneModal = this.modalCtrl.create(TaskModal, {
      action: 'Edit',
      type: 'Milestone',
      task: milestone
    });

    milestoneModal.onDidDismiss((milestone) => {
      if (milestone) {
        this.store.dispatch(new milestoneActions.EditMilestone({ taskId: this.taskId, milestone }));
      }
    });

    milestoneModal.present();
  }

  onToggle(milestone: Task) {
    milestone.isComplete = !milestone.isComplete;
    this.store.dispatch(new milestoneActions.EditMilestone({ taskId: this.taskId, milestone }));
  }

  onDelete(milestone: Task) {
    this.store.dispatch(new milestoneActions.RemoveMilestone({ taskId: this.taskId, milestone }));
  }
}
