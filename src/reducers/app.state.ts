import { SettingsState } from './settings.reducer';
import { ResolutionState } from './resolution.reducer';

export interface AppState {
	settings: SettingsState,
	resolutions: ResolutionState
}