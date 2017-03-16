import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemSliding } from 'ionic-angular'

import { Task } from '../../models';

@Component({
	selector: 'task-list',
	templateUrl: './task-list.component.html'
})
export class TaskListComponent {
	@Input() reorderMode: boolean;
	@Input() tasks: Task[] = [];
	@Output() edit = new EventEmitter();
	@Output() delete = new EventEmitter();
	@Output() toggle = new EventEmitter();
	@Output() reorder = new EventEmitter();
	@Output() select = new EventEmitter();

	ngOnChanges(changes) {
		console.log('list changes', changes);

		if (changes.reorderMode) {
			this.reorderMode = changes.reorderMode.currentValue;
		}
	}

	toggleTask(task: Task, slidingItem: ItemSliding): void {
		this.toggle.emit(task);
    slidingItem.close();
  }

  editTask(task: Task, slidingItem: ItemSliding): void {
		this.edit.emit(task);
    slidingItem.close();
  }

  deleteTask(task: Task, slidingItem: ItemSliding): void {
    this.delete.emit(task);
    slidingItem.close();
  }

	reorderTasks(index: { from: number, to: number }): void {
		this.reorder.emit(index);
	}

	selectTask(task: Task) {
		this.select.emit(task);
	}

	countIncompleteMilestones(task: Task) {
    return task.milestones.filter((milestone: Task) => {
      return !milestone.isComplete;
    }).length;
  }
}