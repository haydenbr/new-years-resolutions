import { Action } from '@ngrx/store';

import { Settings } from '../models';
import { actionType } from '../util';

export const actions = {
	TOGGLE_DARK_MODE: actionType('[Settings] Toggle Dark Mode'),
	TOGGLE_EDIT_MODE: actionType('[Settings] Toggle Edit Mode')
};

export class ToggleDarkMode implements Action {
	type = actions.TOGGLE_DARK_MODE;

	constructor() {}
}

export class ToggleEditMode implements Action {
	type = actions.TOGGLE_EDIT_MODE;

	constructor() {}
}