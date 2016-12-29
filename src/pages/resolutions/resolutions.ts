import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, ModalController, ItemSliding } from 'ionic-angular';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TaskFactory, SettingsService, QuoteService, Id } from '../../providers';
import { Task, Settings } from '../../models';
import { TaskModal } from '../../components';
import { MilestonesPage } from '../milestones/milestones';
import * as reducers from '../../reducers';
import * as taskCollectionActions from '../../actions/task.actions'

@Component({
  selector: 'page-resolutions',
  templateUrl: 'resolutions.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResolutionsPage {
  editMode: boolean = false;
  settings: Settings;
  quote: string = '';
  resolutions: Observable<Task[]>;

  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private settingsService: SettingsService,
    private store: Store<reducers.State>,
    private quoteService: QuoteService,
    private id: Id
  ) {
    this.settings = this.settingsService.settings;
    this.quote = this.quoteService.getRandomQuote();
    this.resolutions = store.select(reducers.getTasks);
  }

  goToMilestones(resolution: Task): void {
    this.navCtrl.push(MilestonesPage, {
      resolution: resolution
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  addResolution(): void {
    let taskModal = this.modalCtrl.create(TaskModal);

    taskModal.onDidDismiss(task => {
      if (task) {
        task.id = this.id.id();
        this.store.dispatch(new taskCollectionActions.AddTask(task));
      }
    });

    taskModal.present();
  }

  onToggle(task: Task) {
    task.isComplete = !task.isComplete;
    this.store.dispatch(new taskCollectionActions.EditTask(task));
  }

  onEdit(task: Task) {
    let taskModal = this.modalCtrl.create(TaskModal, { task: task, action: 'Edit' });

    taskModal.onDidDismiss(task => {
      if (task) {
        this.store.dispatch(new taskCollectionActions.EditTask(task));
      }
    });

    taskModal.present();
  }

  onDelete(task: Task) {
    this.store.dispatch(new taskCollectionActions.RemoveTask(task));
  }

  onReorder(index: { from: number, to: number }) {
    this.store.dispatch(new taskCollectionActions.ReorderTask(index));
  }
}
