import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as fromActions from '../actions/resolution.actions';
import { ResolutionService } from '../resolution/services';

@Injectable()
export class ResolutionEffects {
	constructor(private actions: Actions, private resolutionService: ResolutionService) {}

	// startWith operator causes run on app start
	@Effect()
	loadResolutions: Observable<Action> = this.actions
		.ofType(fromActions.actions.GET_ALL)
		.startWith(new fromActions.GetAll())
		.switchMap(() => {
			return this.resolutionService
				.getResolutions()
				.map(resolutions => new fromActions.GetAllSuccess(resolutions))
				.catch(error => of(new fromActions.GetAllFail(error)));
		});

	@Effect()
	addResolution: Observable<Action> = this.actions
		.ofType(fromActions.actions.CREATE)
		.map((action: fromActions.Create) => action.payload)
		.switchMap(resolution => {
			return this.resolutionService
				.addResolution(resolution)
				.map(() => new fromActions.CreateSuccess(resolution))
				.catch(error => {
					return of(new fromActions.CreateFail(error));
				});
		});

	@Effect()
	removeResolution: Observable<Action> = this.actions
		.ofType(fromActions.actions.DELETE)
		.map((action: fromActions.Delete) => action.payload)
		.switchMap(resolution => {
			return this.resolutionService
				.removeResolution(resolution)
				.map(() => new fromActions.DeleteSuccess(resolution))
				.catch(error => of(new fromActions.DeleteFail(error)));
		});

	@Effect()
	reorderResolution: Observable<Action> = this.actions
		.ofType(fromActions.actions.REORDER)
		.map((action: fromActions.Reorder) => action.payload)
		.switchMap((index: { from: number; to: number }) => {
			return this.resolutionService
				.reorderResolutions(index)
				.map(() => new fromActions.ReorderSuccess(index))
				.catch(error => of(new fromActions.ReorderFail(error)));
		});

	@Effect()
	editResolution: Observable<Action> = this.actions
		.ofType(fromActions.actions.UPDATE)
		.map((action: fromActions.Update) => action.payload)
		.switchMap(resolution => {
			return this.resolutionService
				.updateResolution(resolution)
				.map(() => new fromActions.UpdateSuccess(resolution))
				.catch(error => of(new fromActions.UpdateFail(error)));
		});

	@Effect()
	clearResolutions: Observable<Action> = this.actions.ofType(fromActions.actions.DELETE_ALL).switchMap(() => {
		return this.resolutionService
			.clearResolutions()
			.map(() => new fromActions.DeleteAllSuccess())
			.catch(error => of(new fromActions.DeleteAllFail(error)));
	});
}
