import { Action } from '@ngrx/store';

import { Settings } from '../models';
import { actionType } from '../util';

export const actions = {
	LOAD_SETTINGS:						actionType('[Settings] Load Settings'),
	LOAD_SETTINGS_SUCCESS:		actionType('[Settings] Load Settings Success'),
	LOAD_SETTINGS_FAIL:				actionType('[Settings] Load Settings Fail'),
	TOGGLE_DARK_MODE: 				actionType('[Settings] Toggle Dark Mode'),
	TOGGLE_DARK_MODE_SUCCESS: actionType('[Settings] Toggle Dark Mode Success'),
	TOGGLE_DARK_MODE_FAIL: 		actionType('[Settings] Toggle Dark Mode Fail'),
	TOGGLE_REORDER_MODE: 			actionType('[Settings] Toggle Reorder Mode')
};

export class LoadSettings implements Action {
	type = actions.LOAD_SETTINGS;

	constructor(public payload?: any) {}
}

export class LoadSettingsSuccess implements Action {
	type = actions.LOAD_SETTINGS_SUCCESS;

	constructor(public payload: Settings) {}
}

export class LoadSettingsFail implements Action {
	type = actions.LOAD_SETTINGS_FAIL;

	constructor(public payload?: any) {}
}

export class ToggleDarkMode implements Action {
	type = actions.TOGGLE_DARK_MODE;

	constructor(public payload: boolean) {}
}

export class ToggleDarkModeSuccess implements Action {
	type = actions.TOGGLE_DARK_MODE_SUCCESS;

	constructor(public payload: boolean) {}
}

export class ToggleDarkModeFail implements Action {
	type = actions.TOGGLE_DARK_MODE_FAIL;

	constructor(public payload?: any) {}
}

export class ToggleReorderMode implements Action {
	type = actions.TOGGLE_REORDER_MODE;

	constructor(public payload?: any) {}
}