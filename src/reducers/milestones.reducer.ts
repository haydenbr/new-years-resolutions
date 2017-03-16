import { Action } from '@ngrx/store';

import { ResolutionsState } from './resolutions.reducer';
import * as milestoneAction from '../actions/milestone.actions';
import { Task } from '../models';
import { reorder } from '../util';

export function milstonesReducer(state: ResolutionsState, action: Action): ResolutionsState {
	let reducerHandle = reducerCases[action.type];

	if (reducerHandle) {
		let taskId = action.payload.taskId,
				task = state.resolutions[taskId];

		return Object.assign({}, state, {
			tasks: Object.assign({}, state.resolutions, {
				[taskId]: Object.assign({}, task, {
					milestones: reducerHandle(task, action.payload)
				})
			})
		});
	}

	return state;
}

let reducerCases = {};

reducerCases[milestoneAction.actions.ADD_MILESTONE_SUCCESS] =
	function (task: Task, payload) {
		return task.milestones.concat(payload.milestone);
	};

reducerCases[milestoneAction.actions.REMOVE_MILESTONE_SUCCESS] =
	function (task: Task, payload) {
		return task.milestones.filter((m) => m.id !== payload.milestone.id);
	};

reducerCases[milestoneAction.actions.EDIT_MILESTONE_SUCCESS] =
	function (task: Task, payload) {
		let milestone = payload.milestone;

		return task.milestones.map((m) => {
			if (m.id === milestone.id) {
				return milestone;
			}
			return m;
		});
	};

reducerCases[milestoneAction.actions.REORDER_MILESTONE_SUCCESS] =
	function (task: Task, payload) {
		return reorder(task.milestones, payload.index);
	};