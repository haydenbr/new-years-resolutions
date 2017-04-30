import { Component, Input, Output } from '@angular/core';
import { ItemSliding } from 'ionic-angular'

import { Subject } from 'rxjs/Subject';

import { Task } from '../../models';

@Component({
	selector: 'task-list',
	templateUrl: './task-list.component.html'
})
export class TaskListComponent {
	@Input() reorderMode: boolean;
	@Input() tasks: Task[] = [];
	@Output() edit = new Subject();
	@Output() delete = new Subject();
	@Output() toggle = new Subject();
	@Output() reorder = new Subject();
	@Output() select = new Subject();

	ngOnChanges(changes) {
		if (changes.reorderMode) {
			this.reorderMode = changes.reorderMode.currentValue;
		}
	}

	toggleTask(task: Task, slidingItem: ItemSliding): void {
		this.toggle.next(task);
    slidingItem.close();
  }

  editTask(task: Task, slidingItem: ItemSliding): void {
		this.edit.next(task);
    slidingItem.close();
  }

  deleteTask(task: Task, slidingItem: ItemSliding): void {
    this.delete.next(task);
    slidingItem.close();
  }

	reorderTasks(index: { from: number, to: number }): void {
		this.reorder.next(index);
	}

	selectTask(task: Task) {
		this.select.next(task);
	}

	countIncompleteMilestones(task: Task) {
    return task.milestones.filter((milestone: Task) => {
      return !milestone.isComplete;
    }).length;
  }
}