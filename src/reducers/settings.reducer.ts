import { Action } from '@ngrx/store';

import * as settings from '../actions/settings.actions';
import { Settings } from '../models';

export interface State {
	darkMode: boolean,
	reorderMode: boolean
}

const initialState: State = {
	darkMode: false,
	reorderMode: false
}

export function reducer(state: State = initialState, action: Action) {
	switch (action.type) {
		case settings.actions.LOAD_SETTINGS_SUCCESS: {
			return Object.assign({}, state, action.payload);
		};

		case settings.actions.TOGGLE_DARK_MODE_SUCCESS: {
			return Object.assign({}, state, { darkMode: !state.darkMode });
		}

		case settings.actions.TOGGLE_REORDER_MODE: {
			return Object.assign({}, state, { reorderMode: !state.reorderMode });
		}

		default: {
			return state;
		}
	}
}

export const getDarkMode = (state: State) => state.darkMode;
export const getReorderMode = (state: State) => state.reorderMode;