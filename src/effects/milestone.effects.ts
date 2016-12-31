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

	@Effect()
	addMilestone: Observable<Action> = this.actions
		.ofType(milestoneActions.actions.ADD_MILESTONE)
		.map((action: Action) => {
			return action.payload;
		})
		.mergeMap((milestone) => {
			return Observable.fromPromise(this.storage.addTask(milestone))
				.map(() => {
					return new milestoneActions.AddMilestoneSuccess(milestone);
				})
				.catch(() => {
					return of(new milestoneActions.AddMilestoneFail(milestone));
				});
		});

	@Effect()
	removeMilestone: Observable<Action> = this.actions
		.ofType(milestoneActions.actions.REMOVE_MILESTONE)
		.map((action: Action) => {
			return action.payload;
		})
		.mergeMap((milestone) => {
			return Observable.fromPromise(this.storage.removeTask(milestone))
				.map(() => {
					return new milestoneActions.RemoveMilestoneSuccess(milestone);
				})
				.catch(() => {
					return of(new milestoneActions.RemoveMilestoneSuccess(milestone));
				});
		});

		@Effect()
		reorderMilestone: Observable<Action> = this.actions
			.ofType(milestoneActions.actions.REORDER_MILESTONE)
			.map((action: Action) => {
				return action.payload;
			})
			.mergeMap((index: { from: number, to: number }) => {
				return Observable.fromPromise(this.storage.reorderTasks(index))
					.map((milestones: Task[]) => {
						return new milestoneActions.ReorderMilestoneSuccess(index);
					})
					.catch((tasks) => {
						return of(new milestoneActions.ReorderMilestoneFail(index));
					});
			});

		@Effect()
		editMilestone: Observable<Action> = this.actions
			.ofType(milestoneActions.actions.EDIT_MILESTONE)
			.map((action: Action) => {
				return action.payload
			})
			.mergeMap((milestone) => {
				return Observable.fromPromise(this.storage.updateTask(milestone))
					.map(() => {
						return new milestoneActions.EditMilestoneSuccess(milestone);
					})
					.catch(() => {
						return of(new milestoneActions.EditMilestoneFail(milestone));
					});
			});
}