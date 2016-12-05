import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Task } from '../../services';

@Component({
  templateUrl: 'task-modal.html'
})
export class TaskModal {
	task: Task = new Task();
	type: String = 'Resolution';

	constructor(private viewCtrl: ViewController, private navParams: NavParams) {
		if (this.navParams.get('type')) {
			this.type = this.navParams.get('type');
		}
	}

	dismiss() {
    this.viewCtrl.dismiss();
  }

  addTask() {
  	this.viewCtrl.dismiss(this.task);
  }
}
