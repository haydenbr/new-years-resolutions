import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import * as resolutionActions from '../actions/resolution.actions';
import { ResolutionService } from '../resolution/services';

@Injectable()
export class ResolutionEffects {
	constructor(
		private actions: Actions,
		private resolutionService: ResolutionService
	) {}

	// startWith operator causes run on app start
	@Effect()
	loadResolutions: Observable<Action> = this.actions
		.ofType(resolutionActions.actions.GET_ALL)
		.startWith(new resolutionActions.GetAll())
		.switchMap(() => {
			return this.resolutionService.getResolutions()
				.map((resolutions) => new resolutionActions.GetAllSuccess(resolutions))
				.catch((error) => of(new resolutionActions.GetAllFail(error)));
		});

	@Effect()
	addResolution: Observable<Action> = this.actions
		.ofType(resolutionActions.actions.CREATE)
		.map(toPayload)
		.switchMap((resolution) => {
			return this.resolutionService.addResolution(resolution)
				.map(() => new resolutionActions.CreateSuccess(resolution))
				.catch((error) => {
					return of(new resolutionActions.CreateFail(error))
				});
		});

	@Effect()
	removeResolution: Observable<Action> = this.actions
		.ofType(resolutionActions.actions.DELETE)
		.map(toPayload)
		.switchMap((resolution) => {
			return this.resolutionService.removeResolution(resolution)
				.map(() => new resolutionActions.DeleteSuccess(resolution))
				.catch((error) => of(new resolutionActions.DeleteFail(error)));
		});

	@Effect()
	reorderResolution: Observable<Action> = this.actions
		.ofType(resolutionActions.actions.REORDER)
		.map(toPayload)
		.switchMap((index: { from: number, to: number }) => {
			return this.resolutionService.reorderResolutions(index)
				.map(() => new resolutionActions.ReorderSuccess(index))
				.catch((error) => of(new resolutionActions.ReorderFail(error)));
		});

	@Effect()
	editResolution: Observable<Action> = this.actions
		.ofType(resolutionActions.actions.UPDATE)
		.map(toPayload)
		.switchMap((resolution) => {
			return this.resolutionService.updateResolution(resolution)
				.map(() => new resolutionActions.UpdateSuccess(resolution))
				.catch((error) => of(new resolutionActions.UpdateFail(error)));
		});

	@Effect()
	clearResolutions: Observable<Action> = this.actions
		.ofType(resolutionActions.actions.DELETE_ALL)
		.switchMap(() => {
			return this.resolutionService.clearResolutions()
				.map(() => new resolutionActions.DeleteAllSuccess())
				.catch((error) => of (new resolutionActions.DeleteAllFail(error)));
		});
}