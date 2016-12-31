import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as milestoneActions from '../actions/milestone.actions';
import { Task } from'../models';
import { StorageService } from '../providers';

@Injectable()
export class ResolutionEffects {
	constructor(
		private actions: Actions,
		private storage: StorageService
	) {}

	// payload { taskId, milestone }
	@Effect()
	addMilestone: Observable<Action> = this.actions
		.ofType(milestoneActions.actions.ADD_MILESTONE)
		.map((action: Action) => {
			return action.payload;
		})
		.mergeMap((payload: { taskId: string, milestone: Task }) => {
			return Observable.fromPromise(this.storage.addMilestone(payload.taskId, payload.milestone))
				.map(() => {
					return new milestoneActions.AddMilestoneSuccess(payload);
				})
				.catch(() => {
					return of(new milestoneActions.AddMilestoneFail(payload));
				});
		});

	// payload { taskId, milestone }
	@Effect()
	removeMilestone: Observable<Action> = this.actions
		.ofType(milestoneActions.actions.REMOVE_MILESTONE)
		.map((action: Action) => {
			return action.payload;
		})
		.mergeMap((payload: { taskId: string, milestone: Task }) => {
			return Observable.fromPromise(this.storage.removeMilestone(payload.taskId, payload.milestone))
				.map(() => {
					return new milestoneActions.RemoveMilestoneSuccess(payload);
				})
				.catch(() => {
					return of(new milestoneActions.RemoveMilestoneSuccess(payload));
				});
		});

		// payload { taskId, index }
		@Effect()
		reorderMilestone: Observable<Action> = this.actions
			.ofType(milestoneActions.actions.REORDER_MILESTONE)
			.map((action: Action) => {
				return action.payload;
			})
			.mergeMap((payload: { taskId: string, index: { from: number, to: number } }) => {
				return Observable.fromPromise(this.storage.reorderMilestone(payload.taskId, payload.index))
					.map(() => {
						return new milestoneActions.ReorderMilestoneSuccess(payload);
					})
					.catch(() => {
						return of(new milestoneActions.ReorderMilestoneFail(payload));
					});
			});

		// payload { taskId, milestone }
		@Effect()
		editMilestone: Observable<Action> = this.actions
			.ofType(milestoneActions.actions.EDIT_MILESTONE)
			.map((action: Action) => {
				return action.payload
			})
			.mergeMap((payload: { taskId: string, milestone: Task }) => {
				return Observable.fromPromise(this.storage.updateMilestone(payload.taskId, payload.milestone))
					.map(() => {
						return new milestoneActions.EditMilestoneSuccess(payload);
					})
					.catch(() => {
						return of(new milestoneActions.EditMilestoneFail(payload));
					});
			});
}