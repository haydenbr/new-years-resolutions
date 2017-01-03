import { Action } from '@ngrx/store';

import * as settings from '../actions/settings.actions';

export interface State {
	darkMode: boolean,
	reorderMode: boolean
}

const initialState: State = {
	darkMode: false,
	reorderMode: false
}

// ============= REDUCER =============

export function reducer(state: State = initialState, action: Action) {
	switch (action.type) {
		case settings.actions.LOAD_SETTINGS_SUCCESS: {
			return Object.assign({}, state, action.payload);
		};

		case settings.actions.TOGGLE_DARK_MODE_SUCCESS: {
			return Object.assign({}, state, { darkMode: action.payload });
		}

		case settings.actions.TOGGLE_REORDER_MODE: {
			return Object.assign({}, state, { reorderMode: !state.reorderMode });
		}

		default: {
			return state;
		}
	}
}

let reducerCases = {};

reducerCases[settings.actions.LOAD_SETTINGS_SUCCESS] =
	function (state: State, action: Action) {
		return Object.assign({}, state, action.payload);
	};

reducerCases[settings.actions.TOGGLE_DARK_MODE_SUCCESS] =
	function (state: State, action: Action) {
		return Object.assign({}, state, { darkMode: action.payload });
	};

reducerCases[settings.actions.TOGGLE_REORDER_MODE] =
	function (state: State, action: Action) {
		return Object.assign({}, state, { reorderMode: !state.reorderMode });
	};

// ============= SELECTORS =============

export const getDarkMode = (state: State) => state.darkMode;
export const getReorderMode = (state: State) => state.reorderMode;