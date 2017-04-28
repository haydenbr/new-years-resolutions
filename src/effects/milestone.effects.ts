import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as milestoneActions from '../actions/milestone.actions';
import { Task } from'../models';
import { StorageService } from '../services';

@Injectable()
export class MilestoneEffects {
	constructor(
		private actions: Actions,
		private storage: StorageService
	) {}

	// payload { resolutionId, milestone }
	@Effect()
	addMilestone: Observable<Action> = this.actions
		.ofType(milestoneActions.actions.ADD_MILESTONE)
		.map((action: Action) => {
			return action.payload;
		})
		.mergeMap((payload: { resolutionId: string, milestone: Task }) => {
			return Observable.fromPromise(this.storage.addMilestone(payload.resolutionId, payload.milestone))
				.map(() => {
					return new milestoneActions.AddMilestoneSuccess(payload);
				})
				.catch((err) => {
					console.error('milestone add fail', err);
					return of(new milestoneActions.AddMilestoneFail(payload));
				});
		});

	// payload { resolutionId, milestone }
	@Effect()
	removeMilestone: Observable<Action> = this.actions
		.ofType(milestoneActions.actions.REMOVE_MILESTONE)
		.map((action: Action) => {
			return action.payload;
		})
		.mergeMap((payload: { resolutionId: string, milestone: Task }) => {
			return Observable.fromPromise(this.storage.removeMilestone(payload.resolutionId, payload.milestone))
				.map(() => {
					return new milestoneActions.RemoveMilestoneSuccess(payload);
				})
				.catch(() => {
					return of(new milestoneActions.RemoveMilestoneSuccess(payload));
				});
		});

		// payload { resolutionId, index }
		@Effect()
		reorderMilestone: Observable<Action> = this.actions
			.ofType(milestoneActions.actions.REORDER_MILESTONE)
			.map((action: Action) => {
				return action.payload;
			})
			.mergeMap((payload: { resolutionId: string, index: { from: number, to: number } }) => {
				return Observable.fromPromise(this.storage.reorderMilestone(payload.resolutionId, payload.index))
					.map(() => {
						return new milestoneActions.ReorderMilestoneSuccess(payload);
					})
					.catch((err) => {
						console.error(err);
						return of(new milestoneActions.ReorderMilestoneFail(payload));
					});
			});

		// payload { resolutionId, milestone }
		@Effect()
		editMilestone: Observable<Action> = this.actions
			.ofType(milestoneActions.actions.EDIT_MILESTONE)
			.map((action: Action) => {
				return action.payload
			})
			.mergeMap((payload: { resolutionId: string, milestone: Task }) => {
				return Observable.fromPromise(this.storage.updateMilestone(payload.resolutionId, payload.milestone))
					.map(() => {
						return new milestoneActions.EditMilestoneSuccess(payload);
					})
					.catch(() => {
						return of(new milestoneActions.EditMilestoneFail(payload));
					});
			});
}