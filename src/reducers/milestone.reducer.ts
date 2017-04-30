import { Action } from '@ngrx/store';

import { ResolutionState } from './resolution.reducer';
import * as milestoneAction from '../actions/milestone.actions';
import { Task } from '../resolution/models';
import { reorder } from '../util';

export function milstoneReducer(state: ResolutionState, action: Action): ResolutionState {
	let reducerHandle = reducerCases[action.type];

	if (reducerHandle) {
		let resolutionId = action.payload.resolutionId,
				resolution = state.resolutions[resolutionId];

		return Object.assign({}, state, {
			resolutions: Object.assign({}, state.resolutions, {
				[resolutionId]: Object.assign({}, resolution, {
					milestones: reducerHandle(resolution, action.payload)
				})
			})
		});
	}

	return state;
}

let reducerCases = {};

reducerCases[milestoneAction.actions.ADD_MILESTONE_SUCCESS] =
	function (resolution: Task, payload) {
		return resolution.milestones.concat(payload.milestone);
	};

reducerCases[milestoneAction.actions.REMOVE_MILESTONE_SUCCESS] =
	function (resolution: Task, payload) {
		return resolution.milestones.filter((m) => m.id !== payload.milestone.id);
	};

reducerCases[milestoneAction.actions.EDIT_MILESTONE_SUCCESS] =
	function (resolution: Task, payload) {
		let milestone = payload.milestone;

		return resolution.milestones.map((m) => {
			if (m.id === milestone.id) {
				return milestone;
			}
			return m;
		});
	};

reducerCases[milestoneAction.actions.REORDER_MILESTONE_SUCCESS] =
	function (resolution: Task, payload) {
		return reorder(resolution.milestones, payload.index);
	};