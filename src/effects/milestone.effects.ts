import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import * as milestoneActions from '../actions/milestone.actions';
import { Task } from'../resolution/models';
import { ResolutionService } from '../resolution/services';

@Injectable()
export class MilestoneEffects {
	constructor(
		private actions: Actions,
		private resolutionService: ResolutionService
	) {}

	@Effect()
	addMilestone: Observable<Action> = this.actions
		.ofType(milestoneActions.actions.ADD_MILESTONE)
		.map(toPayload)
		.switchMap((payload: { resolutionId: string, milestone: Task }) => {
			return this.resolutionService.addMilestone(payload.resolutionId, payload.milestone)
				.map(() => new milestoneActions.AddMilestoneSuccess(payload))
				.catch(error => of(new milestoneActions.AddMilestoneFail(error)));
		});

	@Effect()
	removeMilestone: Observable<Action> = this.actions
		.ofType(milestoneActions.actions.REMOVE_MILESTONE)
		.map(toPayload)
		.switchMap((payload: { resolutionId: string, milestone: Task }) => {
			return this.resolutionService.removeMilestone(payload.resolutionId, payload.milestone)
				.map(() => new milestoneActions.RemoveMilestoneSuccess(payload))
				.catch(error => of(new milestoneActions.RemoveMilestoneFail(error)));
		});

	@Effect()
	reorderMilestone: Observable<Action> = this.actions
		.ofType(milestoneActions.actions.REORDER_MILESTONE)
		.map(toPayload)
		.switchMap((payload: { resolutionId: string, index: { from: number, to: number } }) => {
			return this.resolutionService.reorderMilestone(payload.resolutionId, payload.index)
				.map(() => new milestoneActions.ReorderMilestoneSuccess(payload))
				.catch((error) => of(new milestoneActions.ReorderMilestoneFail(error)));
		});

	@Effect()
	editMilestone: Observable<Action> = this.actions
		.ofType(milestoneActions.actions.EDIT_MILESTONE)
		.map(toPayload)
		.switchMap((payload: { resolutionId: string, milestone: Task }) => {
			return this.resolutionService.updateMilestone(payload.resolutionId, payload.milestone)
				.map(() => new milestoneActions.EditMilestoneSuccess(payload))
				.catch((error) => of(new milestoneActions.EditMilestoneFail(error)));
		});
}