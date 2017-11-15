import { combineReducers } from '@ngrx/store';

import { settingsReducer } from './settings.reducer';
import { resolutionReducer } from './resolution.reducer';

const reducers = {
	settings: settingsReducer,
	resolutions: resolutionReducer
}

let stateReducer = combineReducers(reducers);

export function reducer(state, action) {
	return stateReducer(state, action);
}
