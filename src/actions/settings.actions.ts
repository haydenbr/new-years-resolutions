import { Action } from '@ngrx/store';

import { Settings } from '../settings/models';

import { actionType } from './action-type';

export const actions = {
	GET_SETTINGS:							actionType('[Settings] Get Settings'),
	GET_SETTINGS_SUCCESS:			actionType('[Settings] Get Settings Success'),
	GET_SETTINGS_FAIL:				actionType('[Settings] Get Settings Fail'),
	TOGGLE_DARK_MODE: 				actionType('[Settings] Toggle Dark Mode'),
	TOGGLE_DARK_MODE_SUCCESS: actionType('[Settings] Toggle Dark Mode Success'),
	TOGGLE_DARK_MODE_FAIL: 		actionType('[Settings] Toggle Dark Mode Fail'),
	TOGGLE_REORDER_MODE: 			actionType('[Settings] Toggle Reorder Mode')
};

export class GetSettings implements Action {
	type = actions.GET_SETTINGS;

	constructor(public payload?: any) {}
}

export class GetSettingsSuccess implements Action {
	type = actions.GET_SETTINGS_SUCCESS;

	constructor(public payload: Settings) {}
}

export class GetSettingsFail implements Action {
	type = actions.GET_SETTINGS_FAIL;

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