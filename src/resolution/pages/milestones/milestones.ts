import { Component, OnInit } from '@angular/core';
import {
  NavController,
  NavParams,
  ModalController,
  ItemSliding
} from 'ionic-angular';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as milestoneActions from '../../../actions/milestone.actions';
import * as settingsActions from '../../../actions/settings.actions';
import { AppState } from '../../../reducers/app.state';
import { getCurrentResolution } from '../../../reducers/resolutions.reducer';
import { getDarkMode, getReorderMode } from '../../../reducers/settings.reducer';

import { TaskModal } from '../../modals';
import { Task } from '../../models';

@Component({
  selector: 'milestones',
  templateUrl: 'milestones.html'
})
export class MilestonesPage implements OnInit {
  resolution: Observable<Task>;
  darkMode: Observable<boolean>;
  reorderMode: Observable<boolean>;
  editMode: boolean = false;
  resolutionId: string = '';

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.resolution = this.store.select(getCurrentResolution);
    this.darkMode = this.store.select(getDarkMode);
    this.reorderMode = this.store.select(getReorderMode);
    this.resolutionId = this.navParams.data.taskId;
  }

  addMilestone(): void {
    let milestoneModal = this.modalCtrl.create(TaskModal, {
      type: 'Milestone'
    });

    milestoneModal.onDidDismiss((milestone) => {
      if (milestone) {
        this.store.dispatch(new milestoneActions.AddMilestone({ resolutionId: this.resolutionId, milestone }));
      }
    });

    milestoneModal.present();
  }

  onReorder(index: { from: number, to: number }) {
    this.store.dispatch(new milestoneActions.ReorderMilestone({ resolutionId: this.resolutionId, index }));
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
        this.store.dispatch(new milestoneActions.EditMilestone({ resolutionId: this.resolutionId, milestone }));
      }
    });

    milestoneModal.present();
  }

  onToggle(milestone: Task) {
    milestone.isComplete = !milestone.isComplete;
    this.store.dispatch(new milestoneActions.EditMilestone({ resolutionId: this.resolutionId, milestone }));
  }

  onDelete(milestone: Task) {
    this.store.dispatch(new milestoneActions.RemoveMilestone({ resolutionId: this.resolutionId, milestone }));
  }
}
