import { combineReducers } from '@ngrx/store';

import { settingsReducer } from './settings.reducer';
import { resolutionsReducer } from './resolutions.reducer';

const reducers = {
	settings: settingsReducer,
	resolutions: resolutionsReducer
}

export const reducer = combineReducers(reducers);