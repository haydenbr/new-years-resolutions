import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as settings from './settings.reducer';
import * as resolutions from './resolutions.reducer';

// TODO: current resolution

export interface State {
	settings: settings.State,
	resolutions: resolutions.State
}

const reducers = {
	settings: settings.reducer,
	resolutions: resolutions.reducer
}

export const reducer = combineReducers(reducers);

export const getResolutionsState = (state: State) => state.resolutions;
export const getTasks = createSelector(getResolutionsState, resolutions.getTasks);
export const getTasksLoading = createSelector(getResolutionsState, resolutions.getLoading);
export const getTasksLoaded = createSelector(getResolutionsState, resolutions.getLoaded);
export const getSelectedTask = createSelector(getResolutionsState, resolutions.getSelectedTask);

export const getSettingsState = (state: State) => state.settings;
export const getDarkMode = createSelector(getSettingsState, settings.getDarkMode);
export const getEditMode = createSelector(getSettingsState, settings.getEditMode);