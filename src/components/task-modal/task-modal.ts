import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Task, Settings } from '../../models';
import { SettingsService } from '../../services';

@Component({
  templateUrl: 'task-modal.html'
})
export class TaskModal {
  task: Task;
  type: String = 'Resolution';
  action: String = 'Add';
  settings: Settings;

  constructor(
    private viewCtrl: ViewController, 
    private navParams: NavParams,
    private settingsService: SettingsService
  ) {
    if (this.navParams.get('type')) {
      this.type = this.navParams.get('type');
    }

    if (this.navParams.get('action')) {
      this.action = this.navParams.get('action');
    }

    this.task = this.navParams.get('task') ? this.navParams.get('task') : new Task();

    this.settings = this.settingsService.settings;
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  submit(): void {
    this.viewCtrl.dismiss(this.task);
  }
}
