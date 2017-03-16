import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as resolutionActions from '../actions/resolutions.actions';
import { Task } from'../models';
import { StorageService } from '../providers';

@Injectable()
export class ResolutionEffects {
	constructor(
		private actions: Actions,
		private storage: StorageService
	) {}

	@Effect()
	loadTasks: Observable<Action> = this.actions
		.ofType(resolutionActions.actions.GET_ALL)
		.startWith(new resolutionActions.GetAll())
		.switchMap(() => {
			return Observable.fromPromise(this.storage.getTasks())
				.map((tasks: Task[]) => {
					return new resolutionActions.GetAllSuccess(tasks);
				})
				.catch((error) => {
					return of(new resolutionActions.GetAllFail(error));
				});
		});

	@Effect()
	addTask: Observable<Action> = this.actions
		.ofType(resolutionActions.actions.CREATE)
		.map((action: Action) => {
			return action.payload;
		})
		.mergeMap((task) => {
			return Observable.fromPromise(this.storage.addTask(task))
				.map(() => {
					return new resolutionActions.CreateSuccess(task);
				})
				.catch(() => {
					return of(new resolutionActions.CreateFail(task));
				});
		});

	@Effect()
	removeTask: Observable<Action> = this.actions
		.ofType(resolutionActions.actions.DELETE)
		.map((action: Action) => {
			return action.payload;
		})
		.mergeMap((task) => {
			return Observable.fromPromise(this.storage.removeTask(task))
				.map(() => {
					return new resolutionActions.DeleteSuccess(task);
				})
				.catch(() => {
					return of(new resolutionActions.DeleteFail(task));
				});
		});

		@Effect()
		reorderTask: Observable<Action> = this.actions
			.ofType(resolutionActions.actions.REORDER)
			.map((action: Action) => {
				return action.payload;
			})
			.mergeMap((index: { from: number, to: number }) => {
				return Observable.fromPromise(this.storage.reorderTasks(index))
					.map((tasks: Task[]) => {
						return new resolutionActions.ReorderSuccess(index);
					})
					.catch((tasks) => {
						return of(new resolutionActions.ReorderFail(index));
					});
			});

		@Effect()
		editTask: Observable<Action> = this.actions
			.ofType(resolutionActions.actions.UPDATE)
			.map((action: Action) => {
				return action.payload
			})
			.mergeMap((task) => {
				return Observable.fromPromise(this.storage.updateTask(task))
					.map(() => {
						return new resolutionActions.UpdateSuccess(task);
					})
					.catch(() => {
						return of(new resolutionActions.UpdateFail(task));
					});
			});
}