import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewController, NavParams } from 'ionic-angular';

import { Task } from '../../models';

@Component({
  templateUrl: 'task.modal.html'
})
export class TaskModal {
  action = 'Add';
  settings = { darkMode: false };
  task: Task;
  taskForm: FormGroup;
  type = 'Resolution';

  constructor(
    private formBuilder: FormBuilder,
    private viewCtrl: ViewController, 
    private navParams: NavParams,
  ) {
    this.initForm();
  }

  initForm() {
    this.taskForm = this.formBuilder.group({
      taskName: this.task && this.task.name ||  '',
      taskDescription: this.task && this.task.description || ''
    })
  }

  ionViewWillEnter() {
    if (this.navParams.get('type')) {
      this.type = this.navParams.get('type');
    }

    if (this.navParams.get('action')) {
      this.action = this.navParams.get('action');
    }

    this.task = this.navParams.get('task') ? this.navParams.get('task') : new Task();
  }

  disabled() {
    return true;
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  submit(taskName, taskDescription): void {
    this.viewCtrl.dismiss(Object.assign(this.task, { name: taskName.value, description: taskDescription.value }));
  }
}
