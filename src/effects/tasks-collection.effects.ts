import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as tasksCollection from '../actions/tasks-collection.actions';
import { Task } from'../models';
import { StorageService } from '../providers';

@Injectable()
export class TasksCollectionEffects {
	constructor(
		private actions: Actions,
		private storage: StorageService
	) {}

	@Effect()
	loadTasksCollection: Observable<Action> = this.actions
		.ofType(tasksCollection.actions.LOAD)
		.startWith(new tasksCollection.LoadTasks())
		.switchMap(() => {
			return Observable.fromPromise(this.storage.getTasks())
				.map((tasks: Task[]) => {
					console.log('tasks', tasks);
					return new tasksCollection.LoadTaskSuccess(tasks);
				})
				.catch((error) => {
					return of(new tasksCollection.LoadTaskFail(error));
				});
		});

	@Effect()
	addTaskToCollection: Observable<Action> = this.actions
		.ofType(tasksCollection.actions.ADD_TASK)
		.map((action: Action) => {
			return action.payload;
		})
		.mergeMap((task) => {
			return Observable.fromPromise(this.storage.addTask(task))
				.map(() => {
					console.log('adding new task', task);
					return new tasksCollection.AddTaskSuccess(task);
				})
				.catch(() => {
					return of(new tasksCollection.AddTaskFail(task));
				});
		});

	@Effect()
	removeTaskFromCollection: Observable<Action> = this.actions
		.ofType(tasksCollection.actions.REMOVE_TASK)
		.map((action: Action) => {
			return action.payload;
		})
		.mergeMap((task) => {
			return Observable.fromPromise(this.storage.removeTask(task))
				.map(() => {
					return new tasksCollection.RemoveTaskSuccess(task);
				})
				.catch(() => {
					return of(new tasksCollection.RemoveTaskFail(task));
				});
		});

		@Effect()
		reorderTask: Observable<Action> = this.actions
			.ofType(tasksCollection.actions.REORDER_TASK)
			.map((action: Action) => {
				return action.payload
			})
			.mergeMap((tasks) => {
				return Observable.fromPromise(this.storage.setTasks(tasks))
					.map(() => {
						return new tasksCollection.ReorderTaskSuccess(tasks);
					})
					.catch(() => {
						return of(new tasksCollection.ReorderTaskFail(tasks));
					})
			})

		@Effect()
		editTask: Observable<Action> = this.actions
			.ofType(tasksCollection.actions.EDIT_TASK)
			.map((action: Action) => {
				return action.payload
			})
			.mergeMap((task) => {
				return Observable.fromPromise(this.storage.updateTask(task))
					.map(() => {
						return new tasksCollection.EditTaskSuccess(task);
					})
					.catch(() => {
						return of(new tasksCollection.EditTaskFail(task));
					});
			});
}