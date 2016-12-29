import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as settings from './settings.reducer';
import * as tasksCollection from './tasks-collection.reducer';

export interface State {
	settings: settings.State,
	tasksCollection: tasksCollection.State
}

const reducers = {
	settings: settings.reducer,
	tasksCollection: tasksCollection.reducer
}

export const reducer = combineReducers(reducers);

export const getTasksCollectionState = (state: State) => state.tasksCollection;
export const getTasks = createSelector(getTasksCollectionState, tasksCollection.getTasks);
export const getTasksLoading = createSelector(getTasksCollectionState, tasksCollection.getLoading);
export const getTasksLoaded = createSelector(getTasksCollectionState, tasksCollection.getLoaded);

export const getSettingsState = (state: State) => state.settings;
export const getDarkMode = createSelector(getSettingsState, settings.getDarkMode);