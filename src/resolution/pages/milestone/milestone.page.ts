import { Component, OnInit } from '@angular/core';
import {
  NavController,
  NavParams,
  ModalController,
} from 'ionic-angular';

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import * as milestoneActions from '../../../actions/milestone.actions';
import * as settingsActions from '../../../actions/settings.actions';
import { AppState } from '../../../reducers/app.state';
import { getCurrentResolution } from '../../../reducers/resolution.reducer';
import { getDarkMode, getReorderMode } from '../../../reducers/settings.reducer';

import { TaskModal } from '../../modals';
import { Task } from '../../models';

@Component({
  selector: 'milestone',
  templateUrl: 'milestone.page.html'
})
export class MilestonePage implements OnInit {
  resolution: Task;
  darkMode: boolean;
  reorderMode: boolean;
  editMode: boolean = false;
  resolutionId: string = '';
  killSubscriptions = new Subject();

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.resolutionId = this.navParams.data.taskId;

    this.store.select(getCurrentResolution)
      .takeUntil(this.killSubscriptions)
      .subscribe(resolution => this.resolution = resolution);

    this.store.select(getReorderMode)
      .takeUntil(this.killSubscriptions)
      .subscribe(reorderMode => this.reorderMode = reorderMode);

    this.store.select(getDarkMode)
      .takeUntil(this.killSubscriptions)
      .subscribe(darkMode => this.darkMode = darkMode);
  }

  ionViewWillLeave() {
    this.killSubscriptions.next();
  }

  addMilestone(): void {
    let milestoneModal = this.modalCtrl.create(TaskModal, {
      type: 'Milestone',
      darkMode: this.darkMode
    });

    milestoneModal.onDidDismiss((milestone: Task) => {
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

  onEdit(milestone: Task) {
    let milestoneModal = this.modalCtrl.create(TaskModal, {
      action: 'Edit',
      type: 'Milestone',
      task: milestone,
      darkMode: this.darkMode
    });

    milestoneModal.onDidDismiss((milestone: Task) => {
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
