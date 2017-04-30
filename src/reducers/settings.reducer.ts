import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import { AppState } from './app.state';
import * as settings from '../actions/settings.actions';

export interface SettingsState {
	darkMode: boolean,
	reorderMode: boolean
}

const initialState: SettingsState = {
	darkMode: false,
	reorderMode: false
}

// ============= REDUCER =============

export function settingsReducer(state: SettingsState = initialState, action: Action) {
	let reducerHandle = reducerCases[action.type];

	if (reducerHandle) {
		return reducerHandle(state, action);
	}

	return state;
}

let reducerCases = {};

reducerCases[settings.actions.LOAD_SETTINGS_SUCCESS] =
	function (state: SettingsState, action: Action) {
		return Object.assign({}, state, action.payload);
	};

reducerCases[settings.actions.TOGGLE_DARK_MODE_SUCCESS] =
	function (state: SettingsState, action: Action) {
		return Object.assign({}, state, { darkMode: action.payload });
	};

reducerCases[settings.actions.TOGGLE_REORDER_MODE] =
	function (state: SettingsState, action: Action) {
		return Object.assign({}, state, { reorderMode: !state.reorderMode });
	};

// ============= SELECTORS =============

export const getSettingsState = (state: AppState) => state.settings;
export const getDarkMode = createSelector(getSettingsState, state => state.darkMode);
export const getReorderMode = createSelector(getSettingsState, state => state.reorderMode);