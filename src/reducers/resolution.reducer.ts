import { Action } from '@ngrx/store';
import omit from 'lodash/omit';

import * as fromMilestoneActions from '../actions/milestone.actions';
import * as fromActions from '../actions/resolution.actions';
import { Task } from '../resolution/models';
import { reorder } from '../util';
import * as fromMilestone from './milestone.reducer';

export interface State {
	loaded: boolean;
	loading: boolean;
	resolutions: { [id: string]: Task };
	resolutionIds: string[];
	currentResolutionId: string;
}

export const initialState: State = {
	loaded: false,
	loading: false,
	resolutions: {},
	resolutionIds: [],
	currentResolutionId: undefined,
};

// ============= REDUCER =============

export function reducer(
	state: State = initialState,
	action: fromActions.ResolutionAction & fromMilestoneActions.MilestoneAction
): State {
	let reducerHandle = reducerCases[action.type];

	if (reducerHandle) {
		return reducerHandle(state, action);
	}

	return fromMilestone.reducer(state, action);
}

let reducerCases = {};

reducerCases[fromActions.actions.GET_ALL] = function(state: State, action: Action) {
	return Object.assign({}, state, { loading: true });
};

reducerCases[fromActions.actions.GET_ALL_SUCCESS] = function(state: State, action: fromActions.GetAllSuccess) {
	let resolutionsArray = action.payload || [],
		resolutions = {},
		resolutionIds = [];

	resolutionsArray.forEach(r => {
		resolutions[r.id] = r;
		resolutionIds.push(r.id);
	});

	return Object.assign({}, state, { loading: false, loaded: true, resolutions, resolutionIds });
};

reducerCases[fromActions.actions.CREATE_SUCCESS] = function(state: State, action: fromActions.CreateSuccess) {
	let newResolution = action.payload as Task;
	return Object.assign({}, state, {
		resolutions: Object.assign({}, state.resolutions, { [newResolution.id]: newResolution }),
		resolutionIds: state.resolutionIds.concat(newResolution.id),
	});
};

reducerCases[fromActions.actions.DELETE_SUCCESS] = function(state: State, action: fromActions.DeleteSuccess) {
	let removedResolution = action.payload as Task;
	return Object.assign({}, state, {
		resolutions: omit(state.resolutions, removedResolution.id),
		resolutionIds: state.resolutionIds.filter(id => {
			return id !== removedResolution.id;
		}),
	});
};

reducerCases[fromActions.actions.UPDATE_SUCCESS] = function(state: State, action: fromActions.UpdateSuccess) {
	let editedResolution = action.payload as Task;
	return Object.assign({}, state, {
		resolutions: Object.assign({}, state.resolutions, { [editedResolution.id]: editedResolution }),
	});
};

reducerCases[fromActions.actions.REORDER_SUCCESS] = function(state: State, action: fromActions.ReorderSuccess) {
	return Object.assign({}, state, { resolutionIds: reorder(state.resolutionIds, action.payload) });
};

reducerCases[fromActions.actions.SET_CURRENT] = function(state: State, action: fromActions.SetCurrent) {
	return Object.assign({}, state, { currentResolutionId: action.payload.id });
};

reducerCases[fromActions.actions.DELETE_ALL_SUCCESS] = function(state: State, action: fromActions.DeleteAllSuccess) {
	return Object.assign({}, initialState);
};
