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

    taskModal.onDidDismiss(task => {
      if (task) {
        this.store.dispatch(new resolutionActions.Create(task));
      }
    });

    taskModal.present();
  }

  onToggle(task: Task) {
    task.isComplete = !task.isComplete;
    this.store.dispatch(new resolutionActions.Update(task));
  }

  onEdit(task: Task) {
    let taskModal = this.modalCtrl.create(TaskModal, { task: task, action: 'Edit' });

    taskModal.onDidDismiss(task => {
      if (task) {
        this.store.dispatch(new resolutionActions.Update(task));
      }
    });

    taskModal.present();
  }

  onDelete(task: Task) {
    this.store.dispatch(new resolutionActions.Delete(task));
  }

  onReorder(index: { from: number, to: number }) {
    this.store.dispatch(new resolutionActions.Reorder(index));
  }

  onSelect(task: Task) {
    this.store.dispatch(new resolutionActions.SetCurrent(task));
    this.navCtrl.push(MilestonesPage, { taskId: task.id });
  }
}
