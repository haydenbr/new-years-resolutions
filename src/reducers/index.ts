import { createSelector } from 'reselect';

import * as fromResolution from './resolution.reducer';
import * as fromSettings from './settings.reducer';

export interface State {
	resolutions: fromResolution.State;
	settings: fromSettings.State;
}

export const initialState: State = {
	resolutions: fromResolution.initialState,
	settings: fromSettings.initialState,
};

export const reducers = {
	resolutions: fromResolution.reducer,
	settings: fromSettings.reducer,
};

// ============= SELECTORS =============

export const getResolutionsState = (state: State) => state.resolutions;
export const getLoaded = createSelector(getResolutionsState, state => state.loaded);
export const getLoading = createSelector(getResolutionsState, state => state.loading);
export const getResolutionsMap = createSelector(getResolutionsState, state => state.resolutions);
export const getResolutionIds = createSelector(getResolutionsState, state => state.resolutionIds);
export const getCurrentResolutionId = createSelector(getResolutionsState, state => state.currentResolutionId);
export const getResolutions = createSelector(getResolutionsMap, getResolutionIds, (resolutions, ids) => {
	return ids.map(id => {
		return resolutions[id];
	});
});
export const getCurrentResolution = createSelector(getResolutionsMap, getCurrentResolutionId, (resolutions, id) => {
	return resolutions[id];
});
export const getMilestones = createSelector(getCurrentResolution, r => {
	return r.milestones;
});
export const searchResolutions = (searchTerm: string = '') => {
	return createSelector(getResolutions, resolutions => {
		return resolutions.filter(r => r && r.name.includes(searchTerm));
	});
};

export const getSettingsState = (state: State) => state.settings;
export const getDarkMode = createSelector(getSettingsState, state => state.darkMode);
export const getReorderMode = createSelector(getSettingsState, state => state.reorderMode);
