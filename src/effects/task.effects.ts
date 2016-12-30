import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as taskActions from '../actions/task.actions';
import { Task } from'../models';
import { StorageService } from '../providers';

@Injectable()
export class TaskEffects {
	constructor(
		private actions: Actions,
		private storage: StorageService
	) {}

	@Effect()
	loadTasks: Observable<Action> = this.actions
		.ofType(taskActions.actions.LOAD)
		.startWith(new taskActions.LoadTasks())
		.switchMap(() => {
			return Observable.fromPromise(this.storage.getTasks())
				.map((tasks: Task[]) => {
					console.log('tasks', tasks);
					return new taskActions.LoadTaskSuccess(tasks);
				})
				.catch((error) => {
					return of(new taskActions.LoadTaskFail(error));
				});
		});

	@Effect()
	addTask: Observable<Action> = this.actions
		.ofType(taskActions.actions.ADD_TASK)
		.map((action: Action) => {
			return action.payload;
		})
		.mergeMap((task) => {
			return Observable.fromPromise(this.storage.addTask(task))
				.map(() => {
					console.log('adding new task', task);
					return new taskActions.AddTaskSuccess(task);
				})
				.catch(() => {
					return of(new taskActions.AddTaskFail(task));
				});
		});

	@Effect()
	removeTask: Observable<Action> = this.actions
		.ofType(taskActions.actions.REMOVE_TASK)
		.map((action: Action) => {
			return action.payload;
		})
		.mergeMap((task) => {
			return Observable.fromPromise(this.storage.removeTask(task))
				.map(() => {
					return new taskActions.RemoveTaskSuccess(task);
				})
				.catch(() => {
					return of(new taskActions.RemoveTaskFail(task));
				});
		});

		@Effect()
		reorderTask: Observable<Action> = this.actions
			.ofType(taskActions.actions.REORDER_TASK)
			.map((action: Action) => {
				return action.payload;
			})
			.mergeMap((index: { from: number, to: number }) => {
				return Observable.fromPromise(this.storage.reorderTasks(index))
					.map((tasks: Task[]) => {
						return new taskActions.ReorderTaskSuccess(tasks);
					})
					.catch((tasks) => {
						return of(new taskActions.ReorderTaskFail(tasks));
					});
			});

		@Effect()
		editTask: Observable<Action> = this.actions
			.ofType(taskActions.actions.EDIT_TASK)
			.map((action: Action) => {
				return action.payload
			})
			.mergeMap((task) => {
				return Observable.fromPromise(this.storage.updateTask(task))
					.map(() => {
						return new taskActions.EditTaskSuccess(task);
					})
					.catch(() => {
						return of(new taskActions.EditTaskFail(task));
					});
			});
}