import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Task, Settings } from '../../models';

@Component({
  templateUrl: 'task-modal.html'
})
export class TaskModal {
	task: Task = new Task();
	type: String = 'Resolution';
	settings: Settings;

	constructor(
		private viewCtrl: ViewController, 
		private navParams: NavParams
	) {
		if (this.navParams.get('type')) {
			this.type = this.navParams.get('type');
		}

		this.settings = this.navParams.get('settings');
	}

	dismiss(): void {
    this.viewCtrl.dismiss();
  }

  addTask(): void {
  	this.viewCtrl.dismiss(this.task);
  }
}
