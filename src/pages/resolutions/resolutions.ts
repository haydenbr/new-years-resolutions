import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, ModalController, ItemSliding } from 'ionic-angular';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SettingsService, QuoteService } from '../../providers';
import { Task, Settings } from '../../models';
import { TaskModal } from '../../components';
import { MilestonesPage } from '../milestones/milestones';
import * as reducers from '../../reducers';
import * as taskActions from '../../actions/task.actions';
import * as settingsActions from '../../actions/settings.actions';

@Component({
  selector: 'page-resolutions',
  templateUrl: 'resolutions.html',
  // changeDetection: ChangeDetectionStrategy.OnPush // TODO: when this is on, task-list component isn't picking up changes to settings
})
export class ResolutionsPage {
  editMode: boolean = false;
  quote: string = '';
  resolutions: Observable<Task[]>;
  settings: Observable<Settings>;

  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private settingsService: SettingsService,
    private store: Store<reducers.State>,
    private quoteService: QuoteService
  ) {
    this.quote = this.quoteService.getRandomQuote();
    this.resolutions = store.select(reducers.getTasks);
    this.settings = store.select(reducers.getSettingsState);
  }

  toggleEditMode(): void {
    this.store.dispatch(new settingsActions.ToggleEditMode());
  }

  addResolution(): void {
    let taskModal = this.modalCtrl.create(TaskModal);

    taskModal.onDidDismiss(task => {
      if (task) {
        this.store.dispatch(new taskActions.AddTask(task));
      }
    });

    taskModal.present();
  }

  onToggle(task: Task) {
    task.isComplete = !task.isComplete;
    this.store.dispatch(new taskActions.EditTask(task));
  }

  onEdit(task: Task) {
    let taskModal = this.modalCtrl.create(TaskModal, { task: task, action: 'Edit' });

    taskModal.onDidDismiss(task => {
      if (task) {
        this.store.dispatch(new taskActions.EditTask(task));
      }
    });

    taskModal.present();
  }

  onDelete(task: Task) {
    this.store.dispatch(new taskActions.RemoveTask(task));
  }

  onReorder(index: { from: number, to: number }) {
    this.store.dispatch(new taskActions.ReorderTask(index));
  }

  onSelect(task: Task) {
    this.store.dispatch(new taskActions.SelectTask(task));
    this.navCtrl.push(MilestonesPage);
  }
}
