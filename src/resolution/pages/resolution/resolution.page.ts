import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, ModalController } from 'ionic-angular';

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import * as resolutionActions from '../../../actions/resolution.actions';
import * as settingsActions from '../../../actions/settings.actions';
import { AppState } from '../../../reducers/app.state';
import { getResolutions, searchResolutions } from '../../../reducers/resolution.reducer';
import { getDarkMode, getReorderMode } from '../../../reducers/settings.reducer';
import { Settings } from '../../../settings/models';

import { TaskModal } from '../../modals';
import { Task } from '../../models';
import { MilestonePage } from '../milestone/milestone.page';

@Component({
  selector: 'resolution',
  templateUrl: 'resolution.page.html'
})
export class ResolutionPage {
  editMode: boolean = false;
  resolutions: Task[];
  settings: Settings;
  darkMode: boolean;
  reorderMode: boolean;
  killSubscriptions = new Subject();
  searchFormControl = new FormControl();

  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private store: Store<AppState>,
  ) {}

  ionViewWillEnter() {
    this.store.select(getResolutions)
      .takeUntil(this.killSubscriptions)
      .subscribe(resolutions => this.resolutions = resolutions);

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

  onToggleReorderMode(): void {
    this.store.dispatch(new settingsActions.ToggleReorderMode());
  }

  addResolution(): void {
    let taskModal = this.modalCtrl.create(TaskModal, { darkMode: this.darkMode });

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
    let taskModal = this.modalCtrl.create(TaskModal, { task: resolution, action: 'Edit', darkMode: this.darkMode });

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
    this.navCtrl.push(MilestonePage, { taskId: resolution.id });
  }

  onSearch() {
    // this takes care of both searching and refreshing after search
    this.store.select(searchResolutions(this.searchFormControl.value))
      .take(1)
      .subscribe(resolutions => this.resolutions = resolutions);
  }
}
