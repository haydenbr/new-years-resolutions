import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Task, Settings } from '../../models';
import { TaskModal } from '../../components';
import { MilestonesPage } from '../milestones/milestones';
import { AppState } from '../../reducers/app.state';
import { getDarkMode, getReorderMode } from '../../reducers/settings.reducer';
import { getResolutions } from '../../reducers/resolutions.reducer';
import * as resolutionActions from '../../actions/resolutions.actions';
import * as settingsActions from '../../actions/settings.actions';

@Component({
  selector: 'page-resolutions',
  templateUrl: './resolutions.html'
})
export class ResolutionsPage implements OnInit {
  editMode: boolean = false;
  resolutions: Observable<Task[]>;
  settings: Observable<Settings>;
  darkMode: Observable<boolean>;
  reorderMode: Observable<boolean>;

  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.resolutions = this.store.select(getResolutions);
    this.darkMode = this.store.select(getDarkMode);
    this.reorderMode = this.store.select(getReorderMode);
  }

  onToggleReorderMode(): void {
    this.store.dispatch(new settingsActions.ToggleReorderMode());
  }

  addResolution(): void {
    let taskModal = this.modalCtrl.create(TaskModal);

    taskModal.onDidDismiss(resolution => {
      if (resolution) {
        this.store.dispatch(new resolutionActions.Create(resolution));
      }
    });

    taskModal.present();
  }

  onToggle(resolution: Task) {
    resolution.isComplete = !resolution.isComplete;
    this.store.dispatch(new resolutionActions.Update(resolution));
  }

  onEdit(resolution: Task) {
    let taskModal = this.modalCtrl.create(TaskModal, { task: resolution, action: 'Edit' });

    taskModal.onDidDismiss(resolution => {
      if (resolution) {
        this.store.dispatch(new resolutionActions.Update(resolution));
      }
    });

    taskModal.present();
  }

  onDelete(resolution: Task) {
    this.store.dispatch(new resolutionActions.Delete(resolution));
  }

  onReorder(index: { from: number, to: number }) {
    this.store.dispatch(new resolutionActions.Reorder(index));
  }

  onSelect(resolution: Task) {
    this.store.dispatch(new resolutionActions.SetCurrent(resolution));
    this.navCtrl.push(MilestonesPage, { taskId: resolution.id });
  }
}
