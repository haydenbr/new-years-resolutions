import { Action } from '@ngrx/store';

import * as settings from '../actions/settings.actions';
import { Task } from '../models';

export interface State {
	darkMode: boolean,
	editMode: boolean
}

const initialState: State = {
	darkMode: false,
	editMode: false
}

export function reducer(state: State = initialState, action: Action) {
	switch (action.type) {
		case settings.actions.TOGGLE_DARK_MODE: {
			return Object.assign({}, state, { darkMode: !state.darkMode });
		}

		case settings.actions.TOGGLE_EDIT_MODE: {
			return Object.assign({}, state, { editMode: !state.editMode });
		}

		default: {
			return state;
		}
	}
}

export const getDarkMode = (state: State) => state.darkMode;
export const getEditMode = (state: State) => state.editMode;