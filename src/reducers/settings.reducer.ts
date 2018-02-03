import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as fromActions from '../actions/settings.actions';

export interface State {
	darkMode: boolean;
	reorderMode: boolean;
}

export const initialState: State = {
	darkMode: false,
	reorderMode: false,
};

let reducerCases = {};

reducerCases[fromActions.actions.GET_SETTINGS_SUCCESS] = function(
	state: State,
	action: fromActions.GetSettingsSuccess
) {
	return Object.assign({}, state, action.payload);
};

reducerCases[fromActions.actions.TOGGLE_DARK_MODE_SUCCESS] = function(
	state: State,
	action: fromActions.ToggleDarkModeSuccess
) {
	return Object.assign({}, state, { darkMode: action.payload });
};

reducerCases[fromActions.actions.TOGGLE_REORDER_MODE] = function(state: State, action: fromActions.ToggleReorderMode) {
	return Object.assign({}, state, { reorderMode: !state.reorderMode });
};

// ============= REDUCER =============

export function reducer(state: State = initialState, action: fromActions.SettingsAction) {
	let reducerHandle = reducerCases[action.type];

	if (reducerHandle) {
		return reducerHandle(state, action);
	}

	return state;
}
