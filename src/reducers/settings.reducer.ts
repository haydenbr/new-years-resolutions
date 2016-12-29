import { Action } from '@ngrx/store';

import * as settings from '../actions/settings.actions';
import { Task } from '../models';

export interface State {
	darkMode: boolean
}

const initialState: State = {
	darkMode: false
}

export function reducer(state: State = initialState, action: Action) {
	switch (action.type) {
		case settings.actions.TOGGLE_DARK_MODE: {
			return { darkMode: !state.darkMode };
		}

		default: {
			return state;
		}
	}
}

export const getDarkMode = (state: State) => state.darkMode;