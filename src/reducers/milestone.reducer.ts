import { Action } from '@ngrx/store';

import { State } from './resolution.reducer';
import * as fromActions from '../actions/milestone.actions';
import { Task } from '../resolution/models';
import { reorder } from '../util';

export function reducer(state: State, action: fromActions.MilestoneAction): State {
	let reducerHandle = reducerCases[action.type];

	if (reducerHandle) {
		let resolutionId = action.payload.resolutionId,
			resolution = state.resolutions[resolutionId];

		return Object.assign({}, state, {
			resolutions: Object.assign({}, state.resolutions, {
				[resolutionId]: Object.assign({}, resolution, {
					milestones: reducerHandle(resolution, action.payload),
				}),
			}),
		});
	}

	return state;
}

let reducerCases = {};

reducerCases[fromActions.actions.ADD_MILESTONE_SUCCESS] = function(resolution: Task, payload) {
	return resolution.milestones.concat(payload.milestone);
};

reducerCases[fromActions.actions.REMOVE_MILESTONE_SUCCESS] = function(resolution: Task, payload) {
	return resolution.milestones.filter(m => m.id !== payload.milestone.id);
};

reducerCases[fromActions.actions.EDIT_MILESTONE_SUCCESS] = function(resolution: Task, payload) {
	let milestone = payload.milestone;

	return resolution.milestones.map(m => {
		if (m.id === milestone.id) {
			return milestone;
		}
		return m;
	});
};

reducerCases[fromActions.actions.REORDER_MILESTONE_SUCCESS] = function(resolution: Task, payload) {
	return reorder(resolution.milestones, payload.index);
};
