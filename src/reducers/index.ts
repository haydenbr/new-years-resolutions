import { combineReducers } from '@ngrx/store';

import { settingsReducer } from './settings.reducer';
import { resolutionReducer } from './resolution.reducer';

const reducers = {
	settings: settingsReducer,
	resolutions: resolutionReducer
}

export const reducer = combineReducers(reducers);