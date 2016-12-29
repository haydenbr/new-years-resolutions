import { Component } from '@angular/core';
import { NavController, ModalController, ItemSliding } from 'ionic-angular';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TaskFactory, SettingsService, QuoteService } from '../../providers';
import { Task, Settings } from '../../models';
import { TaskModal } from '../../components';
import { MilestonesPage } from '../milestones/milestones';
import * as reducers from '../../reducers';
import * as taskCollectionActions from '../../actions/tasks-collection.actions';

@Component({
  selector: 'page-resolutions',
  templateUrl: 'resolutions.html'
})
export class ResolutionsPage {
  editMode: boolean = false;
  settings: Settings;
  quote: string = '';
  resolutions: Observable<Task[]>;

  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private taskFactory: TaskFactory,
    private settingsService: SettingsService,
    private store: Store<reducers.State>,
    private quoteService: QuoteService
  ) {
    this.settings = this.settingsService.settings;
    this.quote = this.quoteService.getRandomQuote();
    this.resolutions = store.select(reducers.getTasks);
  }

  addResolution(): void {
    let taskModal = this.modalCtrl.create(TaskModal);

    taskModal.onDidDismiss(task => {
      if (task) {
        this.store.dispatch(new taskCollectionActions.AddTask(task));
      }
    });

    taskModal.present();
  }

  goToMilestones(resolution: Task): void {
    this.navCtrl.push(MilestonesPage, {
      resolution: resolution
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  reorderResolutions(index: any): void {
    console.log(index);
    this.taskFactory.reorder(index);
  }

  toggleComplete(resolution: Task, slidingItem: ItemSliding): void {
    this.taskFactory.toggleComplete(resolution).then(() => {
      slidingItem.close();
    });
  }

  edit(resolution: Task, slidingItem: ItemSliding): void {
    let taskModal = this.modalCtrl.create(TaskModal, {
      action: 'Edit',
      task: resolution
    });

    taskModal.onDidDismiss(task => {
      if (task) {
        this.taskFactory.update();
      }
    });

    slidingItem.close();
    taskModal.present();
  }

  delete(index: number, slidingItem: ItemSliding): void {
    this.taskFactory.remove(index).then(() => {
      slidingItem.close();
    });
  }
}
