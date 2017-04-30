import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import * as resolutionActions from '../actions/resolutions.actions';
import { Task } from'../resolution/models';
import { ResolutionService } from '../resolution/services';

@Injectable()
export class ResolutionEffects {
	constructor(
		private actions: Actions,
		private resolutionService: ResolutionService
	) {}

	// startWith operator causes run on app start
	@Effect()
	loadTasks: Observable<Action> = this.actions
		.ofType(resolutionActions.actions.GET_ALL)
		.startWith(new resolutionActions.GetAll())
		.switchMap(() => {
			return this.resolutionService.getResolutions()
				.map((tasks) => new resolutionActions.GetAllSuccess(tasks))
				.catch((error) => of(new resolutionActions.GetAllFail(error)));
		});

	@Effect()
	addTask: Observable<Action> = this.actions
		.ofType(resolutionActions.actions.CREATE)
		.map(toPayload)
		.switchMap((task) => {
			return this.resolutionService.addResolution(task)
				.map(() => new resolutionActions.CreateSuccess(task))
				.catch((error) => {
					return of(new resolutionActions.CreateFail(error))
				});
		});

	@Effect()
	removeTask: Observable<Action> = this.actions
		.ofType(resolutionActions.actions.DELETE)
		.map(toPayload)
		.switchMap((task) => {
			return this.resolutionService.removeResolution(task)
				.map(() => new resolutionActions.DeleteSuccess(task))
				.catch((error) => of(new resolutionActions.DeleteFail(error)));
		});

		@Effect()
		reorderTask: Observable<Action> = this.actions
			.ofType(resolutionActions.actions.REORDER)
			.map(toPayload)
			.switchMap((index: { from: number, to: number }) => {
				return this.resolutionService.reorderResolutions(index)
					.map(() => new resolutionActions.ReorderSuccess(index))
					.catch((error) => of(new resolutionActions.ReorderFail(error)));
			});

		@Effect()
		editTask: Observable<Action> = this.actions
			.ofType(resolutionActions.actions.UPDATE)
			.map(toPayload)
			.switchMap((task) => {
				return this.resolutionService.updateResolution(task)
					.map(() => new resolutionActions.UpdateSuccess(task))
					.catch((error) => of(new resolutionActions.UpdateFail(error)));
			});
}