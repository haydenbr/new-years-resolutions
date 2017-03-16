import { SettingsState } from './settings.reducer';
import { ResolutionsState } from './resolutions.reducer';

export interface AppState {
	settings: SettingsState,
	resolutions: ResolutionsState
}