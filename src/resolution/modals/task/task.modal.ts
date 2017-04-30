import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController, NavParams } from 'ionic-angular';

import { Task } from '../../models';

@Component({
  templateUrl: 'task.modal.html'
})
export class TaskModal implements OnInit {
  action = 'Add';
  darkMode: boolean = false;
  task: Task;
  taskForm: FormGroup;
  type = 'Resolution';

  constructor(
    private formBuilder: FormBuilder,
    private viewCtrl: ViewController, 
    private navParams: NavParams,
  ) {}

  initForm(): void {
    this.taskForm = this.formBuilder.group({
      taskName: [this.task && this.task.name || '', Validators.required ],
      taskDescription: [ this.task && this.task.description || '', Validators.required ]
    });
  }

  ngOnInit() {
    this.type = this.navParams.data.type || this.type;
    this.action = this.navParams.data.action || this.action;
    this.task = this.navParams.data.task || new Task();
    this.darkMode = this.navParams.data.darkMode;

    this.initForm();
  }

  disabled(): boolean {
    return !this.taskForm.valid;
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  onFormSubmit(): void {
    let formValue = this.taskForm.value;
    this.viewCtrl.dismiss(Object.assign(this.task, { name: formValue.taskName, description: formValue.taskDescription }));
  }
}
